"use client"

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
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
  ChartTooltipContent,
} from "@/components/ui/chart"

interface TrustKPIChartProps {
  data: {
    reliable: number;
    capable: number;
    ethical: number;
    sincere: number;
  };
  participantCount: number;
}

const chartConfig = {
  score: {
    label: "Trust Score",
  },
  reliable: {
    label: "Reliable",
    color: "hsl(var(--chart-1))",
  },
  capable: {
    label: "Capable",
    color: "hsl(var(--chart-2))",
  },
  ethical: {
    label: "Ethical",
    color: "hsl(var(--chart-3))",
  },
  sincere: {
    label: "Sincere",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function TrustKPIChart({ data, participantCount }: TrustKPIChartProps) {
  const chartData = [
    { category: "reliable", score: data.reliable, fill: chartConfig.reliable.color },
    { category: "capable", score: data.capable, fill: chartConfig.capable.color },
    { category: "ethical", score: data.ethical, fill: chartConfig.ethical.color },
    { category: "sincere", score: data.sincere, fill: chartConfig.sincere.color },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trust Analysis Results</CardTitle>
        <CardDescription>
          Category-wise Trust Scores (Based on {participantCount} participants)
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
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="score"
              strokeWidth={2}
              radius={8}
              fill="currentColor"
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}