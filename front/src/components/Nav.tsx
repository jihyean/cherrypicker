"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun, CircleUserRound, Mail, Cherry } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const user_data = {
  user_id: "12345",
  user_name: "John Doe",
  user_gender: true,  // true: 남성, false: 여성
  user_email: "johndoe@example.com",
  user_created_at: "2023-01-15"
};

interface UserData {
  user_id: string;
  user_name: string;
  user_gender: boolean;
  user_email: string;
  user_created_at: string;
}

export default function NavBar() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false) // false: light mode, true: dark mode

  // 페이지 마운트 시에, 시스템의 기본 태마로 설정
  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
    }
    if (theme === "light") {
      setIsDarkMode(false)
      document.body.classList.add('light-mode')
    }
  }, [])

  const toggleDarkMode = () => {
    if (!isDarkMode) {
      setIsDarkMode(!isDarkMode)
      document.body.classList.toggle('dark-mode')
      setTheme("dark")
      return
    }
    setIsDarkMode(!isDarkMode)
    // CSS class로 다크 모드 전환 처리
    document.body.classList.toggle('light-mode')
    setTheme("light")
  }

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl">
              CherryPicker
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/snap">SNAP</NavLink>
              <NavLink href="/outfit">Outfit</NavLink>
              <NavLink href="/product">Product</NavLink>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
              <NavLink href="/logout">Logout</NavLink>
              {/* 추후 사용자 이름으로 설정 예정 및 클릭시 프로필 수정 */}
              <ProfileHoverCard href="/" user_data={user_data}></ProfileHoverCard>
              {/* <NavLink href="/profile">Profile</NavLink> */}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              className="ml-4"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-zinc-50"
    >
      {children}
    </Link>
  )
}


function ProfileHoverCard({ href, user_data }: { href: string; user_data: UserData }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={href}>
          <Button variant="link" className='inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-zinc-50'>
            @_{user_data.user_id}
          </Button>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          {/* <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar> */}
          <div className="space-y-1">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              <CircleUserRound size="20"/>
              <p>{user_data.user_name}</p>
            </h4>
            <p className="flex gap-1 text-sm font-semibold">
              <Mail size="20"/> 
              <p>{user_data.user_email}</p>
            </p>
            <div className="flex items-center gap-1 pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined {user_data.user_created_at}
              </span>
              <Cherry className="mr-2 h-4 w-4 opacity-70"/>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
