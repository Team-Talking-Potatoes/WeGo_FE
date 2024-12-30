import { APIError } from '@/@types/api';

const handleResponse = async (response: Response, callName: string) => {
  if (!response.ok) {
    const error = new Error(`Get travel data failed: ${callName}`) as APIError;
    error.status = response.status;
    error.message = `Server error: ${response.status}`;
    throw error;
  }
  return response.json();
};

/* ---- 여행 상세 ----*/
export const postTravelParticipation = async (travlId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/participation?id=${travlId}`,
    {
      method: 'POST',
      credentials: 'include',
    },
  );
  return handleResponse(response, 'postTravelParticipation');
};

export const deleteTravelParticipation = async (travlId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels/participation?id=${travlId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
  return handleResponse(response, 'deleteTravelParticipation');
};

export const deleteTravel = async (travlId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/travels?id=${travlId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
  return handleResponse(response, 'deleteTravelParticipation');
};

/* ---- 여행 목록 ----*/
