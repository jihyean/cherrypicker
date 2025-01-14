"use client";

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Moon, Sun, CircleUserRound, Mail, Cherry, Menu, X, Camera, Sparkles, Inbox, LogIn, LogOut, UserRoundPlus, ChevronDown, Plus } from 'lucide-react'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { CalendarDays } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AppDispatch, RootState } from "@/store"
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import { logout } from '@/store/authSlice';

interface UserData {
  user_id: string;
  user_name: string;
  user_gender: boolean;
  user_email: string;
  user_created_at: string;
}

export default function NavBar() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (theme === "dark") {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
    }
    if (theme === "light") {
      setIsDarkMode(false)
      document.body.classList.add('light-mode')
    }
  }, [theme])

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    setTheme(isDarkMode ? "light" : "dark")
    document.body.classList.toggle('dark-mode')
    document.body.classList.toggle('light-mode')
  }

  // 로그아웃 요청
  const handleLogout = async () => {
    try {
      dispatch(logout());
      // 로그아웃 성공
      await Swal.fire({
        icon: 'success',
        title: '로그아웃 성공',
        text: '로그아웃 되었습니다',
      });
      router.push('/login'); // 성공 시 메인 페이지로 이동
    } catch (err) {
      // 에러 예외처리
      Swal.fire({
        icon: 'error',
        title: '로그아웃 실패',
        text: '알 수 없는 오류가 발생했습니다.',
      });
    }
  };
  


  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl">
              CherryPicker
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* PC */}
            <div className="hidden md:flex md:gap-3">
              <NavLink href="/snap">SNAP</NavLink>
              <NavLink href="/outfit">Outfit</NavLink>
              {/* <NavLink href="/product">Product</NavLink> */}
              <ProductDropdown />
              
              {!user && <NavLink href="/login">Login</NavLink>}
              {!user && <NavLink href="/register">Register</NavLink>}
              {user && <NavLink href="#" onClick={handleLogout}>Logout</NavLink>}
            </div>
            {user && <ProfileHoverCard href="/" user_data={user} />}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              className=""
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <div className="flex flex-col">
                  <NavLink href="/snap"><Camera/><p className='pt-1'>SNAP</p></NavLink>
                  <NavLink href="/outfit"><Sparkles/><p className='pt-1'>Outfit</p></NavLink>
                  <ProductDropdownMobile />
                  {/* <NavLink href="/product"><Inbox/><p className='pt-1'>Product</p></NavLink> */}
                  {!user && <NavLink href="/login"><LogIn/><p className='pt-1'>Login</p></NavLink>}
                  {!user && <NavLink href="/register"><UserRoundPlus/><p className='pt-1'>Register</p></NavLink>}
                  {user && <NavLink href="#" onClick={handleLogout}><LogOut/><p className='pt-1'>Logout</p></NavLink>}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 px-1 py-4 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-zinc-50 dark:hover:text-zinc-300"
    >
      {children}
    </Link>
  )
}

function ProductDropdown() {
  return (
    <Popover>
      <PopoverTrigger asChild className=''>
        <Button variant="link" className="flex items-center gap-2 px-1 py-8 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-zinc-50 dark:hover:text-zinc-300">
          Product <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="flex flex-col">
          <NavLink href="/product">
            <Inbox className="h-4 w-4" />
            View Products
          </NavLink>
          <NavLink href="/product/add">
            <Plus className="h-4 w-4" />
            Add Product
          </NavLink>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function ProductDropdownMobile() {
  return (
    <div className="flex flex-col">
      <NavLink href="/product">
        <Inbox className="h-5 w-5" />
        <p className='pt-1'>Products</p>
      </NavLink>
      <NavLink href="/product/add">
        <Plus className="h-5 w-5 ml-5" />
        <p className='pt-1'>Add Product</p>
      </NavLink>
    </div>
  )
}

function ProfileHoverCard({ href, user_data }: { href: string; user_data: UserData }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={href}>
          <Button variant="link" className='inline-flex items-center px-1 pt-1 text-sm font-semibold text-gray-900 hover:text-gray-700 dark:text-zinc-50 dark:hover:text-zinc-300'>
            @_{user_data.user_id}
          </Button>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="flex items-center gap-1 text-sm font-semibold">
              <CircleUserRound size="20"/>
              <p>{user_data.user_name}</p>
            </h4>
            <p className="flex gap-1 text-sm font-semibold">
              <Mail size="20"/> 
              <span>{user_data.user_email}</span>
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