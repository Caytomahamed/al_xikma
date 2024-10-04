'use client';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Adding all 12 months and extending the color palette
const chartData = [
  { browser: 'sales', visitors: 275, fill: 'rgb(88,116,199)' },
  { browser: 'Jan', visitors: 200, fill: '#91a8ff' },
  { browser: 'Feb', visitors: 187, fill: '#74a6ff' },
  { browser: 'March', visitors: 173, fill: '#3a5bab' },
  { browser: 'April', visitors: 160, fill: '#002e76' },
  { browser: 'May', visitors: 150, fill: '#abc0ff' },
  { browser: 'June', visitors: 120, fill: '#88a4ff' },
  { browser: 'July', visitors: 130, fill: '#5c89ff' },
  { browser: 'Aug', visitors: 140, fill: '#4e6eff' },
  { browser: 'Sept', visitors: 125, fill: '#3251ff' },
  { browser: 'Oct', visitors: 115, fill: '#2b3dcc' },
  { browser: 'Nov', visitors: 100, fill: '#243199' },
  { browser: 'Dec', visitors: 90, fill: '#1d2675' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  Jan: {
    label: 'Jan',
    color: 'rgb(88,116,200)',
  },
} satisfies ChartConfig;

export function DoughnutChart() {
  return (
    <Card className="flex flex-col flex-1 bg-white">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-gray-500 text-xl">Sales</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
