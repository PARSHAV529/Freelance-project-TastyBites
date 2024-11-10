// eslint-disable-next-line no-unused-vars
import * as React from "react"

import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { InputForm } from "./Form"

export default function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>ADD ITEM</CardTitle>
        
      </CardHeader>
      <CardContent>

        <div className="flex justify-center items-center">
        <InputForm/>
        </div>
       
        
       
        
      </CardContent>
     
    </Card>
  )
}
