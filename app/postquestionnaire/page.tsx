"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ButtonArrow from "@/components/ui/buttonArrow"
// import ButtonDemo from "@/components/ui/buttonLoader"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
// import { doc, updateDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const questions = {
  reliable: [
    { word: "Reliable", full: "Someone or something that is reliable can be trusted or believed because he, she, or it works or behaves well in the way you expect:" },
    { word: "Predictable", full: "Something that is predictable happens in a way or at a time that you know about before it happens:" },
    { word: "Someone you can count on", full: "To be confident that you can depend on someone:" },
    { word: "Consistent", full: "Always behaving or happening in a similar, especially positive, way:" }
  ],
  capable: [
    { word: "Capable", full: "Able to do things effectively and skilfully, and to achieve results:" },
    { word: "Skilled", full: "An ability to do an activity or job well, especially because you have practised it:" },
    { word: "Competent", full: "Able to do something well:" },
    { word: "Meticulous", full: "Very careful and with great attention to every detail:" }
  ],
  ethical: [
    { word: "Ethical", full: "A system of accepted beliefs that control behaviour, especially such a system based on morals:" },
    { word: "Respectable", full: "Considered to be socially acceptable because of your good character, appearance, or behaviour:" },
    { word: "Principled", full: "Always behaving in an honest and moral way:" },
    { word: "Has integrity", full: "The quality of being honest and having strong moral principles that you refuse to change:" }
  ],
  sincere: [
    { word: "Sincere", full: "(of a person, feelings, or behaviour) not pretending or lying; honest:" },
    { word: "Genuine", full: "If something is genuine, it is real and exactly what it appears to be:" },
    { word: "Candid", full: "Honest and telling the truth, especially about something difficult or painful:" },
    { word: "Authentic", full: "If something is authentic, it is real, true, or what people say it is:" }
  ]
}

const questionPages = Array.from({ length: 4 }, (_, pageIndex) => [
  { category: 'reliable', ...questions.reliable[pageIndex] },
  { category: 'capable', ...questions.capable[pageIndex] },
  { category: 'ethical', ...questions.ethical[pageIndex] },
  { category: 'sincere', ...questions.sincere[pageIndex] }
])

export default function PostQuestionnaire() {
  const router = useRouter()
  const [responses, setResponses] = useState<string[]>(new Array(16).fill("4"))
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const isLastPage = currentPage === 3

  const handleResponseChange = (value: string, questionIndex: number) => {
    const newResponses = [...responses]
    const globalIndex = currentPage * 4 + questionIndex
    newResponses[globalIndex] = value
    setResponses(newResponses)
  }

  const calculateCategoryKPIs = (responses: string[]) => {
    const kpis = {
      reliable: [] as number[],
      capable: [] as number[],
      ethical: [] as number[],
      sincere: [] as number[]
    }

    // Group responses by category
    responses.forEach((response, index) => {
      const pageIndex = Math.floor(index / 4)
      const questionIndex = index % 4
      const category = questionPages[pageIndex][questionIndex].category
      if (response !== "DNF") {
        kpis[category as keyof typeof kpis].push(parseInt(response))
      }
    })

    // Calculate averages
    return {
      reliable: kpis.reliable.reduce((a, b) => a + b, 0) / kpis.reliable.length,
      capable: kpis.capable.reduce((a, b) => a + b, 0) / kpis.capable.length,
      ethical: kpis.ethical.reduce((a, b) => a + b, 0) / kpis.ethical.length,
      sincere: kpis.sincere.reduce((a, b) => a + b, 0) / kpis.sincere.length
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Store post-questionnaire data in localStorage
      localStorage.setItem('postQuestionnaireResponses', JSON.stringify(responses))
      localStorage.setItem('categoryKPIs', JSON.stringify(calculateCategoryKPIs(responses)))
      
      router.push('/DemographicPage')
    } catch (error) {
      toast.error(`Failed to save responses: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center mb-10">
      <div className="max-w-5xl w-full mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Post Questionnaire</h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Please rate the robot using the scale from 0 (Not at all) to 7 (Very). 
          If a particular item does not seem to fit the robot in the situation, 
          please select the option that says &quot;Does Not Fit.&quot;
          </p>
          <div className="grid grid-cols-8 gap-2 text-sm mt-2 justify-center">
            <Badge variant="secondary" className="py-1 justify-center">1 = Not at all</Badge>
            <Badge variant="secondary" className="py-1 justify-center">2</Badge>
            <Badge variant="secondary" className="py-1 justify-center">3</Badge>
            <Badge variant="secondary" className="py-1 justify-center">4</Badge>
            <Badge variant="secondary" className="py-1 justify-center">5</Badge>
            <Badge variant="secondary" className="py-1 justify-center">6</Badge>
            <Badge variant="secondary" className="py-1 justify-center">7 = Very</Badge>
            <Badge variant="secondary" className="py-1 justify-center">Does Not Fit</Badge>
          </div>
        </div>

        <div className="space-y-4">
          {questionPages[currentPage].map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {currentPage * 4 + index + 1}. {item.word}
                      {/* <span className="text-xs text-muted-foreground ml-2">({item.category})</span> */}
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.full}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <fieldset className="space-y-4">
                    <RadioGroup 
                      className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
                      value={responses[currentPage * 4 + index]}
                      onValueChange={(value) => handleResponseChange(value, index)}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, "DNF"].map((value) => (
                        <label
                          key={value}
                          className="relative flex size-12 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm font-medium outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                        >
                          <RadioGroupItem
                            value={value.toString()}
                            className="sr-only after:absolute after:inset-0"
                          />
                          {value === "DNF" ? "DNF" : value}
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 space-x-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="ml-2 h-4 w-4" /> Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {questionPages.length}
          </div>

          {isLastPage ? (
            <ButtonArrow
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Submit
            </ButtonArrow>
          ) : (
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === questionPages.length - 1}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}