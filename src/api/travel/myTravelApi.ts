interface MyTravelList {
  travelId: number;
  travelName: string;
  expectedTripCost: number;
  travelMateCount: number;
  isDomestic: boolean;
  travelStatus: string;
  location: string;
  image: string;
  startAt: string;
  endAt: string;
  maxTravelMateCount: number;
  currentTravelMateCount: number;
}

interface MyTravel {
  travels: MyTravelList[];
  total: number;
}

interface MyTravelApiError extends Error {
  status?: number;
  message: string;
}

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

export { upcommingTravel };
