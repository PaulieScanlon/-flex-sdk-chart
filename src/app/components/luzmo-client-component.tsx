'use client';

import { LuzmoVizItemComponent } from '@luzmo/react-embed';

interface Props {
  authKey: string;
  authToken: string;
  datasetId: string;
}

export default function LuzmoClientComponent({ authKey, authToken, datasetId }: Props) {
  const date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(); // creates a date 7 days ago

  return (
    <section className='flex flex-col gap-16 p-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
        <div className='w-full h-80'>
          <LuzmoVizItemComponent
            appServer={process.env.NEXT_PUBLIC_LUZMO_APP_SERVER}
            apiHost={process.env.NEXT_PUBLIC_LUZMO_API_HOST}
            authKey={authKey}
            authToken={authToken}
            type='donut-chart'
            options={{
              title: {
                en: `Devices from last 7 days`,
              },
              display: {
                title: true,
              },
              mode: 'donut',
              legend: {
                position: 'bottom',
              },
            }}
            slots={[
              {
                name: 'measure',
                content: [
                  {
                    label: {
                      en: 'Total users',
                    },
                    column: '514d3a0b-f074-4119-9fc5-6366a626ec46', // Total users
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
                    column: 'c7885194-6115-4920-b05a-6f7af388e1c3', // Device category
                    set: datasetId,
                    type: 'hierarchy',
                  },
                ],
              },
            ]}
            filters={[
              {
                condition: 'or',
                filters: [
                  {
                    expression: '? >= ?',
                    parameters: [
                      {
                        column_id: 'dc23c7f3-f9dd-4880-9f57-4a53d1bd23ba', // Date
                        dataset_id: datasetId,
                      },
                      date,
                    ],
                  },
                ],
              },
            ]}
          />
        </div>
        <div className='w-full h-80'>
          <LuzmoVizItemComponent
            appServer={process.env.NEXT_PUBLIC_LUZMO_APP_SERVER}
            apiHost={process.env.NEXT_PUBLIC_LUZMO_API_HOST}
            authKey={authKey}
            authToken={authToken}
            type='line-chart'
            options={{
              title: {
                en: `Site visits from last 7 days`,
              },
              display: {
                title: true,
              },
              mode: 'grouped',
            }}
            slots={[
              {
                name: 'measure',
                content: [
                  {
                    label: {
                      en: 'Total users',
                    },
                    column: '514d3a0b-f074-4119-9fc5-6366a626ec46', // Total users
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
                    column: 'dc23c7f3-f9dd-4880-9f57-4a53d1bd23ba', // Date
                    set: datasetId,
                    type: 'datetime',
                    level: 5,
                  },
                ],
              },
            ]}
            filters={[
              {
                condition: 'or',
                filters: [
                  {
                    expression: '? >= ?',
                    parameters: [
                      {
                        column_id: 'dc23c7f3-f9dd-4880-9f57-4a53d1bd23ba', // Date
                        dataset_id: datasetId,
                        level: 5,
                      },
                      date,
                    ],
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
      <div className='w-full h-80'>
        <LuzmoVizItemComponent
          appServer={process.env.NEXT_PUBLIC_LUZMO_APP_SERVER}
          apiHost={process.env.NEXT_PUBLIC_LUZMO_API_HOST}
          authKey={authKey}
          authToken={authToken}
          type='bar-chart'
          options={{
            title: {
              en: `Page views from last 7 days`,
            },
            display: {
              title: true,
            },
            mode: 'grouped',
            bars: {
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
          slots={[
            {
              name: 'measure',
              content: [
                {
                  label: {
                    en: 'Total users',
                  },
                  column: '514d3a0b-f074-4119-9fc5-6366a626ec46', // Total users
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
                  column: '3a957b36-f3a0-4cca-b483-f9ff49b3390e', // Page title
                  set: datasetId,
                  type: 'hierarchy',
                },
              ],
            },
          ]}
          filters={[
            {
              condition: 'or',
              filters: [
                {
                  expression: '? >= ?',
                  parameters: [
                    {
                      column_id: 'dc23c7f3-f9dd-4880-9f57-4a53d1bd23ba', // Date
                      dataset_id: datasetId,
                    },
                    date,
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
