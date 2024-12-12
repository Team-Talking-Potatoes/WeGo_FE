import { TravelList } from '@/@types/travel';

interface MyTravel {
  travels: TravelList[];
  total: number;
}

interface MyTravelApiError extends Error {
  status?: number;
  message: string;
}

/* ---------------------------------- 예정 여행 --------------------------------- */
const upcommingTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const res = await fetch(
    `/api/travels/scheduled?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    const error = new Error('Login failed') as MyTravelApiError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

/* --------------------------------- 다녀온 여행 --------------------------------- */
const pastTravel = async (limit: number, offset: number): Promise<MyTravel> => {
  const res = await fetch(
    `/api/travels/finished?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const error = new Error('Login failed') as MyTravelApiError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

/* --------------------------------- 체크한 여행 --------------------------------- */
const checkedTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const res = await fetch(
    `/api/travels/checked?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const error = new Error('Login failed') as MyTravelApiError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

/* --------------------------------- 리뷰 작성 가능한 여행 --------------------------------- */
const writableTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const res = await fetch(
    `/api/travels/reviews/pending?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const error = new Error('Login failed') as MyTravelApiError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

/* -------------------------------- 내가 만든 여행 -------------------------------- */
const mySelfTravel = async (
  limit: number,
  offset: number,
): Promise<MyTravel> => {
  const res = await fetch(
    `/api/travels/created?limit=${limit}&offset=${offset}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (!res.ok) {
    const error = new Error('Login failed') as MyTravelApiError;
    error.status = res.status;
    error.message = `Server error: ${res.status}`;
    throw error;
  }

  return res.json();
};

export {
  upcommingTravel,
  pastTravel,
  checkedTravel,
  writableTravel,
  mySelfTravel,
};
