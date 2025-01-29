"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BotIcon as Robot } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Toaster } from "./ui/toaster" // Import the Toaster component
import { useToast } from "@/hooks/use-toast" // Import the useToast hook

export function TermsAndConditions() {
  const [consents, setConsents] = useState({
    readInfo: false,
    voluntary: false,
    dataCollection: false,
    recording: false,
    risksUnderstood: false,
  })

  const allChecked = Object.values(consents).every(Boolean)
  const router = useRouter()
  const { toast } = useToast() // Initialize the toast hook

  const handleAccept = () => {
    if (allChecked) {
      localStorage.setItem('termsAccepted', 'true')
      toast({
        title: "Success",
        description: "You have accepted the terms and conditions.",
      })
      router.push('/prequestionnaire')
    } else {
      toast({
        title: "Error",
        description: "Please accept all terms and conditions to proceed.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-center items-center gap-8 p-4 md:p-8">
      {/* Left Section - Logo and Title */}
      <div className="flex flex-col items-center justify-center">
        <Robot className="w-32 h-32 mb-2" />
        <h1 className="text-5xl font-bold mt-2">RoboRoomieFit</h1>
        <p className="mt-2 text-lg">Your Robotic Fitness Assistant</p>
      </div>

      {/* Right Section */}
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Informed Consent of Study Participation</CardTitle>
          <CardDescription>
            Please review the following terms for participating in the RoboRoomie Pre-Study.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {/* Introduction Section */}
            <div className="mb-8 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Introduction</h3>
              <p className="text-sm text-muted-foreground">
                You are invited to participate in the user study “RoboRoomie Pre-Study - Investigating Human-Robot Verbal Communication”. The study is conducted by{" "}
                <span className="font-bold text-orange-400">Shahariar Ali Bijoy</span>,{" "}
                <span className="font-bold text-orange-400">Hashem Al-Olofi</span>,{" "}
                <span className="font-bold text-orange-400">Manish Kumar</span>,{" "}
                <span className="font-bold text-orange-400">Yali Zhang</span>, and{" "}
                <span className="font-bold text-orange-400">Vishnu Jothish Kumar</span>, and supervised by{" "}
                <span className="font-bold text-orange-400">Bastian Dănekas</span> and{" "}
                <span className="font-bold text-orange-400">Rachel Ringe</span> from the University of Bremen. The study will take place from February 2, 2025, to  February 16, 2025, with an estimated 25 participants.
              </p>
            </div>

            {/* Accordion Terms */}
            <Accordion type="single" collapsible>
              <AccordionItem value="purpose">
                <AccordionTrigger>Purpose and Goal of this Research</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    The purpose of this study is to explore human-robot interaction during strength workout breaks, focusing on the verbal communication between participants and the robot. The goal is to determine whether participants can continue conversations with the robot during exercise breaks. Your participation will help achieve this research goal. The results may be presented at scientific meetings or published in journals.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="participation">
                <AccordionTrigger>Study Participation</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Your participation is entirely voluntary and can be discontinued or withdrawn at any time.</li>
                    <li>You can refuse to answer any questions or continue with the study if you feel uncomfortable.</li>
                    <li>Repeated participation in the study is not permitted.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="procedure">
                <AccordionTrigger>Study Procedure</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Participants will be met and offered the consent form to read and sign.</li>
                    <li>After signing, participants will meet RoboRoomieFit and be briefed about the study’s purpose and procedures.</li>
                    <li>Participants will interact with RoboRoomieFit, which will serve as a fitness assistant, providing guidance and engaging in small talk during workout breaks.</li>
                    <li>Participants will complete a short demographics questionnaire and participate in a post-study interview about their experience.</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="risks">
                <AccordionTrigger>Risks and Benefits</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You will not be exposed to any immediate risk or danger during the study.</li>
                    <li>If any discomfort arises, you should discontinue participation immediately.</li>
                    <li>Enrolled students are insured against accidents through statutory accident insurance.</li>
                    <li>There is a small risk of data leakage despite security measures.</li>
                    <li>You have no direct benefit from participating, but your support helps advance research in this area.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data">
                <AccordionTrigger>Data Protection and Confidentiality</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Personal data will be collected and treated in accordance with the GDPR.</li>
                    <li>Data will be anonymized using code numbers and published in aggregated form.</li>
                    <li>Access to raw data is encrypted and password-protected, accessible only to authorized researchers.</li>
                    <li>Data will be retained for no longer than necessary and can be deleted upon request.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">Consent Form</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="readInfo"
                    checked={consents.readInfo}
                    onCheckedChange={(checked) =>
                      setConsents(prev => ({ ...prev, readInfo: checked === true }))
                    }
                  />
                  <label htmlFor="readInfo">
                    I have read and understood the Participant Information Sheet.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="voluntary"
                    checked={consents.voluntary}
                    onCheckedChange={(checked) =>
                      setConsents(prev => ({ ...prev, voluntary: checked === true }))
                    }
                  />
                  <label htmlFor="voluntary">
                    I understand that my participation is voluntary and that I may withdraw at any time.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dataCollection"
                    checked={consents.dataCollection}
                    onCheckedChange={(checked) =>
                      setConsents(prev => ({ ...prev, dataCollection: checked === true }))
                    }
                  />
                  <label htmlFor="dataCollection">
                    I understand and agree to the collection, use, and storage of data as described.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recording"
                    checked={consents.recording}
                    onCheckedChange={(checked) =>
                      setConsents(prev => ({ ...prev, recording: checked === true }))
                    }
                  />
                  <label htmlFor="recording">
                    I agree to the recording of my interactions with the robotic assistant.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="risksUnderstood"
                    checked={consents.risksUnderstood}
                    onCheckedChange={(checked) =>
                      setConsents(prev => ({ ...prev, risksUnderstood: checked === true }))
                    }
                  />
                  <label htmlFor="risksUnderstood">
                    I understand the risks and benefits associated with this study.
                  </label>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex justify-center space-x-4 mt-4">
          <Button variant="outline">Decline</Button>
          <Button disabled={!allChecked} onClick={handleAccept}>Accept</Button>
        </CardFooter>
      </Card>

      {/* Add the Toaster component to render toast notifications */}
      <Toaster />
    </div>
  )
}