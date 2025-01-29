"use client"

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, TooltipProps } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

interface TrustCategoryChartProps {
  data: {
    performanceTrust: number;
    moralTrust: number;
  };
  participantCount: number;
}

const chartConfig = {
  score: {
    label: "Trust Score",
  },
  performanceTrust: {
    label: "Performance Trust",
    color: "hsl(var(--chart-2))",
  },
  moralTrust: {
    label: "Moral Trust",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const category = payload[0].payload.category as keyof typeof chartConfig;
    const score = payload[0]?.value?.toFixed(2) ?? 'N/A';
    
    const description = category === 'performanceTrust' 
      ? 'Based on combination of Reliable & Capable trust scores'
      : 'Based on combination of Ethical & Sincere trust scores';

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="font-medium">
          {chartConfig[category].label}: {score}
        </div>
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      </div>
    );
  }
  return null;
};

export function TrustCategoryChart({ data, participantCount }: TrustCategoryChartProps) {
  const chartData = [
    { category: "performanceTrust", score: data.performanceTrust, fill: chartConfig.performanceTrust.color },
    { category: "moralTrust", score: data.moralTrust, fill: chartConfig.moralTrust.color },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Combined Trust Categories</CardTitle>
        <CardDescription>
          Performance vs Moral Trust (Based on {participantCount} participants)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="score"
              strokeWidth={2}
              radius={8}
              fill="currentColor"
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}