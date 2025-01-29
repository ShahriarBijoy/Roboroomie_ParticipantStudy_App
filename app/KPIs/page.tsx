// app/stats/page.tsx
"use client"

import KPIChart from "@/components/KPIChart"
import { Card, CardContent } from "@/components/ui/card"

export default function StatsPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">User Sentiment Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Visual representation of user attitudes towards robotics based on questionnaire responses
          </p>
        </div>

        <div className="grid gap-6">
          <KPIChart />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Positive", description: "Users comfortable with robots", color: "var(--chart-1)" },
              { title: "Neutral", description: "Users with balanced views", color: "var(--chart-2)" },
              { title: "Negative", description: "Users with concerns", color: "var(--chart-3)" },
              { title: "Very Negative", description: "Users with strong reservations", color: "var(--chart-4)" }
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div style={{ backgroundColor: `hsl(${item.color})` }} className="h-4 w-4 rounded-full" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}