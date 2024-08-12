'use client';

import { LuzmoVizItemComponent } from '@luzmo/react-embed';

interface Props {
  authKey: string;
  authToken: string;
  datasetId: string;
  range: number;
  date: string;
}

export default function UsersByDeviceDonut({ authKey, authToken, datasetId, range, date }: Props) {
  return (
    <LuzmoVizItemComponent
      className='w-full h-full'
      appServer={process.env.NEXT_PUBLIC_LUZMO_APP_SERVER}
      apiHost={process.env.NEXT_PUBLIC_LUZMO_API_HOST}
      authKey={authKey}
      authToken={authToken}
      type='donut-chart'
      options={{
        title: {
          en: `Devices from last ${range} days`,
        },
        display: {
          title: true,
        },
        mode: 'donut', // this is the default
        legend: {
          position: 'bottom',
        },
      }}
      // https://developer.luzmo.com/guide/flex-sdk--filters
      filters={[
        {
          condition: 'or',
          filters: [
            {
              expression: '? >= ?',
              parameters: [
                {
                  column_id: '89b1b5c8-560e-4533-9657-8cbee549fbde', // Date
                  dataset_id: datasetId,
                },
                date,
              ],
            },
          ],
        },
      ]}
      slots={[
        {
          name: 'measure',
          content: [
            {
              label: {
                en: 'Total users',
              },
              column: '7b29d91f-bac7-4d07-9f67-e4b62da61ccf',
              set: datasetId,
              type: 'numeric',
              format: '.4f',
            },
          ],
        },
        {
          name: 'category',
          content: [
            {
              label: {
                en: 'Device category',
              },
              column: '6579c164-ad27-45be-9ec4-30dc7b903fdf',
              set: datasetId,
              type: 'hierarchy',
            },
          ],
        },
      ]}
    />
  );
}
