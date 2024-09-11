import dynamic from 'next/dynamic';

import Luzmo from '@luzmo/nodejs-sdk';
const LuzmoClientComponent = dynamic(() => import('./components/luzmo-client-component'), {
  ssr: false,
});

const client = new Luzmo({
  api_key: process.env.LUZMO_API_KEY!,
  api_token: process.env.LUZMO_API_TOKEN!,
  host: process.env.NEXT_PUBLIC_LUZMO_API_HOST!,
});

export default async function Home() {
  const response = await client.create('authorization', {
    type: 'embed',
    username: 'user id',
    name: 'first name last name',
    email: 'name@email.com',
    access: {
      datasets: [
        {
          id: '42b43db3-24b2-45e7-98c5-3fcdef20b1a3',
          rights: 'use',
        },
      ],
    },
  });

  const { id, token, access } = response;

  return <LuzmoClientComponent authKey={id} authToken={token} datasetId={access.datasets[0].id} />;
}
