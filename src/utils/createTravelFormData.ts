import { FormTravelData } from '@/@types/travelForm';

export const createTravelFormData = (data: FormTravelData): FormData => {
  const formData = new FormData();

  if (data.registrationEnd.startDate && data.startAt) {
    const registrationEndDate = new Date(
      data.registrationEnd.startDate.getTime() -
        data.registrationEnd.startDate.getTimezoneOffset() * 60000,
    );
    registrationEndDate.setHours(23, 59, 59, 999);

    const registrationEnd = registrationEndDate
      .toLocaleString('sv-SE', { hour12: false })
      .replace(' ', 'T')
      .slice(0, 16);

    const startAt = `${new Date(
      data.startAt.getTime() - data.startAt.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10)}T${data.startTime.hour}:${data.startTime.minute}`;

    const endAt = data.endAt
      ? `${new Date(
          data.endAt.getTime() - data.endAt.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 10)}T${data.endTime.hour}:${data.endTime.minute}`
      : `${new Date(
          data.startAt.getTime() - data.startAt.getTimezoneOffset() * 60000,
        )
          .toISOString()
          .slice(0, 10)}T${data.endTime.hour}:${data.endTime.minute}`;

    formData.append('registrationEnd', registrationEnd);
    formData.append('startAt', startAt);
    formData.append('endAt', endAt);
  }

  formData.append('travelName', data.travelName);
  formData.append('expectedTripCost', data.expectedTripCost);
  formData.append('minTravelMateCount', data.minTravelMateCount);
  formData.append('maxTravelMateCount', data.maxTravelMateCount);
  formData.append('travelDescription', data.travelDescription);
  formData.append('hashTags', `#${data.hashTags.join('#')}`);
  formData.append('travelLocation', data.travelLocation);
  formData.append('departureLocation', data.departureLocation);
  formData.append('isDomestic', `${data.isDomestic}`);

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

  return formData;
};
