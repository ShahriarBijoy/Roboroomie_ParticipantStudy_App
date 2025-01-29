"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { BotIcon as Robot } from 'lucide-react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import ButtonDemo from "@/components/ui/buttonLoader"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
  participantNumber: z.coerce.number().min(1, "Participant number is required"),
  age: z.coerce.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100"),
  gender: z.string().min(1, "Gender is required"),
  terms: z.boolean().refine((val) => val === true, "You must accept terms")
})

export default function DemographicPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participantNumber: undefined,
      age: undefined,
      gender: "",
      terms: false,
    },
  })

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsAccepted')
    if (!termsAccepted) {
      router.push('/finalPage')
    }
  }, [router])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      
      // Get all stored data
      const preResponses = JSON.parse(localStorage.getItem('preQuestionnaireResponses') || '[]')
      const postResponses = JSON.parse(localStorage.getItem('postQuestionnaireResponses') || '[]')
      const categoryKPIs = JSON.parse(localStorage.getItem('categoryKPIs') || '{}')
      const preKpi = localStorage.getItem('preKpi')
  
      // Save everything to database
      await addDoc(collection(db, "users"), {
        ...values,
        preQuestionnaireResponses: preResponses,
        postQuestionnaireResponses: postResponses,
        categoryKPIs,
        preKpi: parseFloat(preKpi || '0'),
        timestamp: new Date(),
      })
  
      // Clear localStorage
      localStorage.clear()
      
      toast({
        title: "Success",
        description: "Data saved successfully!",
      })
      router.push('/finalPage')
    } catch (error: unknown) {
      console.error('Failed to save data:', error);
      toast({
        title: "Error",
        description: "Failed to save data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row justify-center items-center gap-8 p-4 md:p-8">
      <div className="flex flex-col items-center justify-center">
        <Robot className="w-32 h-32 mb-2" />
        <h1 className="text-5xl font-bold mt-2">Roboroomie</h1>
        <p className="mt-2 text-lg text-gray-600">Your Robotic Fitness Assistant</p>
      </div>

      <div className="w-full max-w-lg space-y-8 bg-card p-10 rounded-xl border shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="participantNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participant Number</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Accept terms and conditions</FormLabel>
                    <FormDescription>
                      You agree to our Terms of Service and Privacy Policy.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonDemo 
              type="submit"
              isLoading={isLoading}
              className="w-full"
            >
              Submit
            </ButtonDemo>
          </form>
        </Form>
      </div>
      <Toaster />
    </div>
  )
}