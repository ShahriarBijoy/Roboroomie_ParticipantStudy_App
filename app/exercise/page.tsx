"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import BlurIn from "@/components/ui/blur-in"
import { Ripple } from "@/components/ui/ripple"
import { ConfettiButton } from "@/components/ui/confetti"

export default function ExercisePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDone = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/postquestionnaire')
    }, 2000)
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Ripple Background */}
      <div className="absolute inset-0 z-0">
        <Ripple />
      </div>

      {/* Content */}
      <div className="text-center space-y-8 relative z-10">
        <div className="space-y-1">
          <BlurIn 
            word="Enjoy Your Exercise"
            className="text-4xl font-bold text-black dark:text-white"
            duration={1.5}
          />
          <BlurIn
            word="Once you finish your exercise, please click on the 'I'm Done' button below"
            className="text-sm text-muted-foreground"
            duration={1.5}
            variant={{
              hidden: { filter: "blur(10px)", opacity: 0 },
              visible: { filter: "blur(0px)", opacity: 1 }
            }}
          />
        </div>
        
        <div className="relative">
          <ConfettiButton
            onClick={handleDone}
            disabled={isLoading}
            className="px-8 py-6 text-lg font-medium"
          >
            {isLoading ? "Great job! 🎉" : "I'm Done"}
          </ConfettiButton>
        </div>
      </div>
    </div>
  )
}