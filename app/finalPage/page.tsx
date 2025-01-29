"use client"

import { useRouter } from "next/navigation"
import BlurIn from "@/components/ui/blur-in"
import { Ripple } from "@/components/ui/ripple"
import { ConfettiButton } from "@/components/ui/confetti"


export default function FinalPage() {
  const router = useRouter()
  const handleNewParticipant = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-8 max-w-full text-center space-y-8">
      <div className="absolute inset-0 z-0">
        <Ripple />
      </div>

        <div className="space-y-4">
          <BlurIn
            word="Thank you for participating in our study!"
            className="text-4xl font-bold tracking-tight"
            duration={1.5}
          />
          <BlurIn
            word="Your responses have been recorded successfully."
            className="text-lg text-muted-foreground"
            duration={1.5}
          />
          <BlurIn
            word="If you have any questions or concerns, please don't hesitate to contact us."
            className="text-sm text-muted-foreground"
            duration={1.5}
            variant={{
              hidden: { filter: "blur(20px)", opacity: 0 },
              visible: { filter: "blur(0px)", opacity: 1 }
            }}
          />
        </div>
        
        <div className="relative">
          <ConfettiButton
            onClick={handleNewParticipant}
            className="px-8 py-6 text-lg font-medium"
          >
            Start with New Participant
          </ConfettiButton>
        </div>
      </div>
    </div>
  )
}