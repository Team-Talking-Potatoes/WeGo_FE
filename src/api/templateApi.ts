// 타입은 알아서 분리 관리하여 가져올 것
const templateApi = async ({ input }: { input: string }) => {
  const res = await fetch('/api/template', {
    method: 'POST',
    body: JSON.stringify({ input }),
  });

  return res.json();
};

export default templateApi;
