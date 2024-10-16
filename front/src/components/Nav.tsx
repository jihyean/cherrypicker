"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

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
              {/* <NavLink href="/view">View</NavLink> */}
              <NavLink href="/profile">Profile</NavLink>
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
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-700"
    >
      {children}
    </Link>
  )
}
