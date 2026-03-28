"use client"

import { useState } from "react"
import { Mail, Lock, Users } from "lucide-react"
import { LoginCard } from "@/components/login-card"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <LoginCard />
    </main>
  )
}
