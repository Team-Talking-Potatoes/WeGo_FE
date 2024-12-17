import { APIError } from '@/@types/api';
import { TravelList } from '@/@types/travel';

interface MyTravel {
  travels: TravelList[];
  total: number;
}

/* ---------------------------------- 예정 여행 --------------------------------- */
export const upcommingTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/scheduled?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const error = new Error('Get upcomming travel failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* --------------------------------- 다녀온 여행 --------------------------------- */
export const pastTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/finished?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!response.ok) {
    const error = new Error('Get past travel failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* --------------------------------- 체크한 여행 --------------------------------- */
export const checkedTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/checked?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!response.ok) {
    const error = new Error('Get checked travel failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* --------------------------------- 리뷰 작성 가능한 여행 --------------------------------- */
export const writableTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/reviews/pending?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!response.ok) {
    const error = new Error('Get writable travel failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* -------------------------------- 내가 만든 여행 -------------------------------- */
export const mySelfTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/created?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!response.ok) {
    const error = new Error('Get my self travel failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};

/* --------------------------------- 북마크 여행 --------------------------------- */
export const bookmarkTravel = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/bookmark`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ travelId: id }),
    },
  );

  if (!response.ok) {
    const error = new Error('Bookmark travel failed') as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }

  return response.json();
};
