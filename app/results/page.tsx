"use client"

import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { TrustKPIChart } from "@/components/TrustKPIChart"
import { TrustCategoryChart } from "@/components/TrustCategoryChart"

export default function Results() {
  interface KPIData {
    reliable: number;
    capable: number;
    ethical: number;
    sincere: number;
    performanceTrust: number;
    moralTrust: number;
  }

  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [totalParticipants, setTotalParticipants] = useState<number>(0)

  useEffect(() => {
    const fetchResults = async () => {
      const q = query(
        collection(db, "users"),
        orderBy("timestamp", "desc")
      )

      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        // Initialize sums for each category
        const categoryTotals = {
          reliable: 0,
          capable: 0,
          ethical: 0,
          sincere: 0
        }

        // Sum up all scores for each category
        querySnapshot.docs.forEach(doc => {
          const categoryKPIs = doc.data().categoryKPIs
          if (categoryKPIs) {
            categoryTotals.reliable += categoryKPIs.reliable || 0
            categoryTotals.capable += categoryKPIs.capable || 0
            categoryTotals.ethical += categoryKPIs.ethical || 0
            categoryTotals.sincere += categoryKPIs.sincere || 0
          }
        })

        // Calculate averages
        const participantCount = querySnapshot.size
        const averageKPIs = {
          reliable: categoryTotals.reliable / participantCount,
          capable: categoryTotals.capable / participantCount,
          ethical: categoryTotals.ethical / participantCount,
          sincere: categoryTotals.sincere / participantCount,
          performanceTrust: (categoryTotals.reliable + categoryTotals.capable) / (2 * participantCount),
          moralTrust: (categoryTotals.ethical + categoryTotals.sincere) / (2 * participantCount)
        }

        setKpiData(averageKPIs)
        setTotalParticipants(participantCount)
      }
    }

    fetchResults()
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Overall Trust Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Average trust scores across all participants
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Total Participants: {totalParticipants}
          </p>
        </div>

        {kpiData && <TrustKPIChart data={kpiData} participantCount={totalParticipants} />}
        {kpiData && <TrustCategoryChart data={kpiData} participantCount={totalParticipants} />}
      </div>
    </div>
  )
}