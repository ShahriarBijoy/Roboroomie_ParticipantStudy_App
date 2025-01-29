// components/KPIChart.tsx
"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PieChart, Pie } from 'recharts'
import { TrendingUp } from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function KPIChart() {
  const [data, setData] = useState([
    { sentiment: 'positive', value: 0, fill: "hsl(var(--chart-1))" },
    { sentiment: 'neutral', value: 0, fill: "hsl(var(--chart-2))" },
    { sentiment: 'negative', value: 0, fill: "hsl(var(--chart-3))" },
    { sentiment: 'veryNegative', value: 0, fill: "hsl(var(--chart-4))" }
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Enable debug logging
        console.log("Starting data fetch...")
        
        // Get collection reference
        const usersRef = collection(db, "users")
        console.log("Collection reference:", usersRef)
        
        // Fetch documents
        const querySnapshot = await getDocs(usersRef)
        console.log("Documents fetched:", querySnapshot.size)
        
        const kpis: number[] = []
        
        querySnapshot.forEach((doc) => {
          const userData = doc.data()
          console.log("Document data:", userData)
          
          const responses = userData.preQuestionnaireResponses
          
          if (Array.isArray(responses) && responses.length > 0) {
            // Reverse scores since questions are negatively phrased
            const reversedResponses = responses.map(r => (6 - parseInt(r)).toString())
            const sum = reversedResponses.reduce((acc, val) => acc + parseInt(val), 0)
            const kpi = sum / responses.length
            kpis.push(kpi)
            console.log("Calculated KPI:", kpi)
          }
        })

        const categories = [0, 0, 0, 0]
        kpis.forEach(kpi => {
          if (kpi >= 4) categories[0]++
          else if (kpi >= 3) categories[1]++
          else if (kpi >= 2) categories[2]++
          else categories[3]++
        })
        
        console.log("Final categories:", categories)

        setData(prev => prev.map((item, index) => ({
          ...item,
          value: categories[index]
        })))
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch data")
        toast.error("Failed to load chart data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) return <div>Error: {error}</div>
  if (isLoading) return <div>Loading...</div>
  if (data.every(item => item.value === 0)) return <div>No data available</div>

  const chartConfig = {
    value: {
      label: "Responses",
    },
    positive: {
      label: "Positive",
      color: "hsl(var(--chart-1))",
    },
    neutral: {
      label: "Neutral",
      color: "hsl(var(--chart-2))",
    },
    negative: {
      label: "Negative",
      color: "hsl(var(--chart-3))",
    },
    veryNegative: {
      label: "Very Negative",
      color: "hsl(var(--chart-4))",
    },
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle >Sentiment Distribution</CardTitle>
        <CardDescription>User Response Analysis</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={data} 
              dataKey="value"
              label 
              nameKey="sentiment"
              cx="50%"
              cy="50%"
              outerRadius="80%"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Based on user questionnaire responses <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing sentiment distribution across all responses
        </div>
      </CardFooter>
    </Card>
  )
}
