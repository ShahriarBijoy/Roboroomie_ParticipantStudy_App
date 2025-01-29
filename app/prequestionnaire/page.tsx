"use client"

import { Badge } from "@/components/ui/badge"
import  ButtonArrow  from "@/components/ui/buttonArrow"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { collection, addDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"
import { toast } from "sonner"

const questions = [
  "I feel uncomfortable around robots.",
  "I do not trust robots to make decisions on their own.",
  "Robots should not be allowed to make important decisions without human intervention.",
  "I would feel uneasy if I had to work closely with a robot.",
  "I believe robots are a threat to jobs in society.",
  "Robots are likely to replace human workers in the future.",
  "I feel that robots lack the emotional intelligence to interact with humans.",
  "I think robots are too mechanical and lack human-like qualities.",
  "I would feel threatened if a robot were given too much power in society.",
  "I believe robots are dangerous and should be limited in their capabilities."
]

export default function PreQuestionnaire() {
  const router = useRouter()
  const [responses, setResponses] = useState<string[]>(new Array(questions.length).fill("3"))
  const [isLoading, setIsLoading] = useState(false)

  const handleResponseChange = (value: string, index: number) => {
    const newResponses = [...responses]
    newResponses[index] = value
    setResponses(newResponses)
  }

  const calculateKPI = (responses: string[]) => {
    // Reverse the scores (1->5, 2->4, 3->3, 4->2, 5->1)
    const reversedScores = responses.map(val => (6 - parseInt(val)).toString())
    const sum = reversedScores.reduce((acc, val) => acc + parseInt(val), 0)
    return sum / responses.length
}
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Store pre-questionnaire responses in localStorage
      localStorage.setItem('preQuestionnaireResponses', JSON.stringify(responses))
      localStorage.setItem('preKpi', calculateKPI(responses).toString())
      
      router.push('/exercise')
    } catch (error: unknown) {
      toast.error(`Failed to save responses: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="max-w-4xl w-full mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Pre Questionnaire</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Please indicate your level of agreement with each statement on a scale from 1 to 5:
          </p>
          <div className="grid grid-cols-5 gap-2 text-sm mt-2 justify-center">
            <Badge variant="secondary" className="py-1 justify-center">1 = Strongly Disagree</Badge>
            <Badge variant="secondary" className="py-1 justify-center">2 = Disagree</Badge>
            <Badge variant="secondary" className="py-1 justify-center">3 = Neutral</Badge>
            <Badge variant="secondary" className="py-1 justify-center">4 = Agree</Badge>
            <Badge variant="secondary" className="py-1 justify-center">5 = Strongly Agree</Badge>
          </div>
        </div>

        <div className="space-y-2">
          {questions.map((question, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="font-medium text-left">{index + 1}. {question}</p>
                  <fieldset className="space-y-4">
                    <RadioGroup 
                      className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
                      value={responses[index]}
                      onValueChange={(value) => handleResponseChange(value, index)}
                    >
                      {[1, 2, 3, 4, 5].map((number) => (
                        <label
                          key={number}
                          className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm font-medium outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                        >
                          <RadioGroupItem
                            value={number.toString()}
                            className="sr-only after:absolute after:inset-0"
                          />
                          {number}
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mb-4">
          <ButtonArrow 
            type="submit"
            isLoading={isLoading}
            className="px-8 py-2 mb-4"
            onClick={handleSubmit}
          >
            Submit Responses
          </ButtonArrow>
        </div>
      </div>
    </div>
  )
}
