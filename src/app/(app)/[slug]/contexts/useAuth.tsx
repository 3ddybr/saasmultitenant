'use client'
import {
  FormEvent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { auth } from '@/app/services/firebase'
import { signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface AuthProviderProps {
  // quando as props vao receber qualquer conteúdo do tipo react usa-se ReactNode
  children: ReactNode
}

interface AuthContextProps {
  token: string | null | undefined
  handleLogout: (e: FormEvent) => void
  updateToken: (tokenUser: string) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<null | string | undefined>('')
  const router = useRouter()

  useEffect(() => {
    const tokenLocal = Cookies.get('tokenVehicles')
    setToken(tokenLocal)
  }, [])

  async function handleLogout(e: FormEvent) {
    e.preventDefault()
    try {
      await signOut(auth)
      Cookies.remove('tokenVehicles')
      router.push('/app')
      setToken(null)
    } catch (error) {
      console.error(error)
    }
  }

  const updateToken = useCallback((tokenUser: string) => {
    setToken(tokenUser)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        token,
        handleLogout,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
