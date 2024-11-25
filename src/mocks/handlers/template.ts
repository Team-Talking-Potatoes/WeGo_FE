import { http, HttpResponse } from 'msw';

// 타입은 알아서 분리 관리하여 가져올 것
interface RequestBody {
  input: string;
}

const template = [
  http.post('/api/template', async ({ request }) => {
    const body = (await request.json()) as RequestBody;

    return HttpResponse.json({
      data: {
        input: body.input,
        value: 'fake data',
      },
    });
  }),
];

export default template;
