'use client';

import { LuzmoVizItemComponent } from '@luzmo/react-embed';

interface Props {
  authKey: string;
  authToken: string;
  datasetId: string;
  range: number;
  date: string;
}

export default function UsersByPagePathBar({ authKey, authToken, datasetId, range, date }: Props) {
  return (
    <LuzmoVizItemComponent
      className='w-full h-full'
      appServer={process.env.NEXT_PUBLIC_LUZMO_APP_SERVER}
      apiHost={process.env.NEXT_PUBLIC_LUZMO_API_HOST}
      authKey={authKey}
      authToken={authToken}
      type='bar-chart'
      options={{
        title: {
          en: `Page views from last ${range} days`,
        },
        display: {
          title: true,
        },
        mode: 'grouped',
        bars: {
          // label: 'percentageMax',
          roundedCorners: 5,
        },
        limit: {
          number: 10,
        },
        sort: {
          by: 'measure',
          direction: 'desc',
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
                  column_id: '6dea730a-a961-4a56-ab33-9f252eb8c78a', // Date
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
              column: 'ae37d1c1-c45d-471d-9a12-e276e06cd902',
              set: datasetId,
              type: 'numeric',
              format: '.4f',
            },
          ],
        },
        {
          name: 'y-axis',
          content: [
            {
              label: {
                en: 'Page title',
              },
              column: 'f049a11b-43aa-42b0-9a63-6b411381c39e',
              set: datasetId,
              type: 'hierarchy',
            },
          ],
        },
      ]}
    />
  );
}
