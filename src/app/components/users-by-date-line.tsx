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
      filters={[
        {
          condition: 'or',
          filters: [
            {
              expression: '? >= ?',
              parameters: [
                {
                  column_id: '805e589f-d09c-4ff6-aef9-25a9f9d9d713', // Date
                  dataset_id: datasetId,
                  level: 1,
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
              column: 'e4beda7e-6ece-49fb-bc76-1c6f64a6eb2c',
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
              set: datasetId,
              column: '805e589f-d09c-4ff6-aef9-25a9f9d9d713',
              type: 'datetime',
              //   format: '%Y-%m-%d %H:%M:%S.%f',
              //   format: '%amd~%Y %H:%M:%S.%L',
            },
          ],
        },
      ]}
    />
  );
}
