'use client';

import { LuzmoVizItemComponent } from '@luzmo/react-embed';

interface Props {
  authKey: string;
  authToken: string;
  datasetId: string;
  range: number;
  date: string;
}

export default function UsersByDateLine({ authKey, authToken, datasetId, range, date }: Props) {
  return (
    <LuzmoVizItemComponent
      className='w-full h-full'
      appServer={process.env.NEXT_PUBLIC_LUZMO_APP_SERVER}
      apiHost={process.env.NEXT_PUBLIC_LUZMO_API_HOST}
      authKey={authKey}
      authToken={authToken}
      type='line-chart'
      options={{
        title: {
          en: `Site visits from last ${range} days`,
        },
        display: {
          title: true,
        },
        mode: 'line-chart',
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
                  column_id: '53339ca1-acb8-4343-b374-026d68869e38', // Date
                  dataset_id: datasetId,
                  level: 5,
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
              column: '01911ca0-b12a-4731-93b8-722efdab36f3',
              set: datasetId,
              type: 'numeric',
              format: '.4f',
            },
          ],
        },
        {
          name: 'x-axis',
          content: [
            {
              label: {
                en: 'Date',
              },
              column: '53339ca1-acb8-4343-b374-026d68869e38',
              set: datasetId,
              type: 'datetime',
              level: 5,
            },
          ],
        },
      ]}
    />
  );
}
