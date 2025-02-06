import { FetcherError } from '@/@types/api';
import { getAccessTokenFromCookies } from '@/utils/cookies';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetcherConfig extends RequestInit {
  method: HTTPMethod;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  body?: any;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * HTTP 요청을 처리하는 기본 fetcher 함수
 * @param endpoint - API 엔드포인트 경로
 * @param config - fetch 설정 객체
 * @returns Promise<T> - API 응답 데이터
 * @throws FetcherError - API 요청 실패 시 발생하는 에러
 */
async function fetcher<T>(
  endpoint: string,
  config?: FetcherConfig,
): Promise<T> {
  const defaultConfig: FetcherConfig = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const accessToken =
    typeof window === 'undefined' ? await getAccessTokenFromCookies() : '';

  const mergedConfig = {
    ...defaultConfig,
    ...config,
    headers: Object.fromEntries(
      Object.entries({
        ...defaultConfig.headers,
        ...config?.headers,
        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
        // eslint-disable-next-line
      }).filter(([key, value]) => value !== undefined),
    ),
  } as FetcherConfig;

  if (mergedConfig.body instanceof FormData) {
    if (mergedConfig.headers) {
      delete mergedConfig.headers['Content-Type'];
    }
  } else if (mergedConfig.body) {
    mergedConfig.body = JSON.stringify(mergedConfig.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, mergedConfig);

  if (endpoint === '/auth/token/verification') {
    return { status: response.status } as T;
  }

  if (!response.ok) {
    const error = new Error('API request failed') as FetcherError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
}

export const http = {
  get: <T>(endpoint: string, config?: Omit<FetcherConfig, 'method'>) =>
    fetcher<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(
    endpoint: string,
    data?: any,
    config?: Omit<FetcherConfig, 'method' | 'body'>,
  ) => fetcher<T>(endpoint, { ...config, method: 'POST', body: data }),

  put: <T>(
    endpoint: string,
    data?: any,
    config?: Omit<FetcherConfig, 'method' | 'body'>,
  ) => fetcher<T>(endpoint, { ...config, method: 'PUT', body: data }),

  delete: <T>(endpoint: string, config?: Omit<FetcherConfig, 'method'>) =>
    fetcher<T>(endpoint, { ...config, method: 'DELETE' }),

  patch: <T>(
    endpoint: string,
    data?: any,
    config?: Omit<FetcherConfig, 'method' | 'body'>,
  ) => fetcher<T>(endpoint, { ...config, method: 'PATCH', body: data }),
};
