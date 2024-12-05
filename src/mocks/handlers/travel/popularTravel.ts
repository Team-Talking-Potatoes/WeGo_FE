import { http, HttpResponse } from 'msw';

const popularTravel = http.get('/api/travles/popular', async () => {
  return HttpResponse.json({ message: 'travel popular' });
});

export default popularTravel;
