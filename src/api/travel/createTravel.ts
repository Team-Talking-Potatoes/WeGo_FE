import { APIError } from '@/@types/api';
import { FormTravelData } from '@/@types/travelForm';
import { formatDateToString } from '@/utils/calendarHelper';

export const createTravel = async (data: FormTravelData) => {
  const formData = new FormData();

  formData.append('travelName', data.travelName);
  formData.append('expectedTripCost', data.expectedTripCost);
  formData.append('minTravelMateCount', data.minTravelMateCount);
  formData.append('maxTravelMateCount', data.maxTravelMateCount);
  formData.append(
    'registrationEnd',
    formatDateToString(data.registrationEnd.startDate),
  );
  formData.append('travelDescription', data.travelDescription);
  formData.append('hashTags', data.hashTags.join(''));
  formData.append('travelLocation', data.travelLocation);
  formData.append('departureLocation', data.departureLocation);
  formData.append('isDomestic', `${data.isDomestic}`);
  formData.append('startAt', formatDateToString(data.startAt));
  formData.append(
    'endAt',
    formatDateToString(data.endAt ? data.endAt : data.startAt),
  );
  formData.append(
    'startTime',
    `${data.startTime.hour}:${data.startTime.minute}`,
  );
  formData.append('endTime', `${data.endTime.hour}:${data.endTime.minute}`);
  if (data.travelImage) {
    formData.append('travelImage', data.travelImage);
  }

  data.detailTravel.forEach((detail, index) => {
    formData.append(`detailTravel[${index}].tripDay`, `${detail.tripDay}`);
    formData.append(
      `detailTravel[${index}].tripOrderNumber`,
      `${detail.tripOrderNumber}`,
    );
    formData.append(`detailTravel[${index}].destination`, detail.destination);
    formData.append(`detailTravel[${index}].description`, detail.description);
    if (detail.destinationImage) {
      formData.append(
        `detailTravel[${index}].destinationImage`,
        detail.destinationImage,
      );
    }
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/travels`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const error = new Error('Create travel failed') as APIError;
    error.status = response.status;
    error.message = `Request failed: ${response.status}`;
    throw error;
  }

  return response.json();
};
