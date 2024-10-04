'use client';
import { CartesianGrid, XAxis, Bar, BarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'July', desktop: 214 },
  { month: 'August', desktop: 214 },
  { month: 'September', desktop: 214 },
  { month: 'October', desktop: 214 },
  { month: 'November', desktop: 214 },
  { month: 'December', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Income',
    color: '#00bfa6',
  },
} satisfies ChartConfig;

export function BarGraph() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-gray-500 text-xl">Net Income</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
