'use client'
import { FormEvent, useState } from 'react'
import { auth } from '@/app/services/firebase'
import { User, signInWithEmailAndPassword } from 'firebase/auth'
import { LoginButtonLink, LoginContainer, LoginContent } from './styles'
import { useAuth } from '../contexts/useAuth'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface userCredentialProps extends User {
  accessToken?: string
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogout, token, updateToken } = useAuth()
  const router = useRouter()

  // const token = localStorage.getItem('tokenVehicles')
  // const user = JSON.parse(localStorage.getItem('user'))
  // console.log('verifica token', token, user)

  async function handleSignIn(e: FormEvent) {
    e.preventDefault()

    if (email === ' ' || password === '') {
      return alert('Preencha os campos corretamente.')
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      // console.log(userCredential)
      const user: userCredentialProps = userCredential.user
      Cookies.set('tokenVehicles', user.accessToken as string)
      // localStorage.setItem('tokenVehicles', user.accessToken as string)
      // localStorage.setItem('user', JSON.stringify(user))
      updateToken(user.accessToken as string)
      router.push('/app/veiculos')
    } catch (error) {
      alert('email ou senha inválidos')
      console.log(error)
    }
    //! user navegar pra /veiculos
  }
  // console.log(token)

  return (
    <LoginContainer>
      <LoginContent>
        <h1>Seja bem vindo!</h1>
        {token === null || token === undefined ? (
          <>
            <section>
              <label>E-mail de usuário cadastrado</label>
              <input
                id="email"
                autoFocus
                name="email"
                type="text"
                placeholder="E-mail cadastrado"
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            <section>
              <label>Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="**************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </>
        ) : (
          <>
            <section>
              <h2>Para desconectar pressione o botão:</h2>
            </section>
          </>
        )}

        {token === null || token === undefined ? (
          <LoginButtonLink onClick={handleSignIn}>Login</LoginButtonLink>
        ) : (
          <LoginButtonLink onClick={handleLogout}>Logout</LoginButtonLink>
        )}
      </LoginContent>
    </LoginContainer>
  )
}
