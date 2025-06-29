import { connectToDatabase } from "@/lib/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {
        const {email, password} = await request.json()

        if(!email || !password) {
            return NextResponse.json(
                {error : "email and password is required"},
                {status : 400}
            )
        }

       await connectToDatabase()

       const existingUser = await User.findOne({email})

       if(existingUser) {
        return NextResponse.json(
            {error : "user already exist"},
            {status : 400}
        )
       }

      await User.create({
        email,
        password
      })

      return NextResponse.json(
        {succes : "user is created"},
        {status : 200}
      )

    } catch (error) {
         console.error("registartion error", error)
        return NextResponse.json(
            {error : "server error"},
            {status : 400}
        )
    }
}