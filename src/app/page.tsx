import Luzmo from '@luzmo/nodejs-sdk';
import UsersByDeviceDonut from './components/users-by-device-donut';
import UsersByPagePathBar from './components/users-by-page-path-bar';
import UsersByDateLine from './components/users-by-date-line';

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
          id: 'c1b6293c-badd-4862-a203-14dc0e8c9c0f', // Donut Chart | Flex demo
          rights: 'use',
        },
        {
          id: '8c865076-b7dd-48d9-a888-770fa1566e0d', // Line Chart | Flex demo
          rights: 'use',
        },
        {
          id: 'da025b49-8a10-4d2b-90f8-14d7af20d29d', // Bar Chart | Flex demo
          rights: 'use',
        },
      ],
    },
  });

  const { id, token, access } = response;

  const range = 7;
  const date = new Date(new Date().getTime() - range * 24 * 60 * 60 * 1000).toISOString(); // creates a date 7 days ago

  return (
    <main className='flex flex-col gap-16 p-16'>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-16'>
        <div className='w-full h-80'>
          <UsersByDeviceDonut
            authKey={id}
            authToken={token}
            datasetId={access.datasets[0].id}
            range={range}
            date={date}
          />
        </div>
        <div className='w-full h-80'>
          <UsersByDateLine authKey={id} authToken={token} datasetId={access.datasets[1].id} range={range} date={date} />
        </div>
      </section>
      <section>
        <div className='w-full h-80'>
          <UsersByPagePathBar
            authKey={id}
            authToken={token}
            datasetId={access.datasets[2].id}
            range={range}
            date={date}
          />
        </div>
      </section>
    </main>
  );
}
