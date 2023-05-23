import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react';
import { Box, Button, Flash, FormControl, Text, TextInput } from "@primer/react";
import { useEffect, useState } from "react";
import { AuthRepositoryImpl } from "./AuthRepositoryImpl";
import { CustomError, ErrorType } from "./CustomError";
import { LoginUseCaseImpl } from "./LoginUseCaseImpl";
import { useError } from "./useError";

export function Login() {
  const repository = new AuthRepositoryImpl()
  const useCase = new LoginUseCaseImpl(repository)

  const { getErrorMessage } = useError()

  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [globalError, setGlobalError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername({ value: event.target.value, error: '' })
  }

  function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword({ value: event.target.value, error: '' })
  }

  async function handleLogin() {
    try {
      setIsLoading(true)
      await useCase.execute(username.value, password.value)
      setShowSuccess(true)
    } catch (error) {
      setShowSuccess(false)
      if ((error as CustomError).type === ErrorType.UsernameInput) {
        setUsername(state => ({ ...state, error: getErrorMessage((error as CustomError).message) }))
      }
      if ((error as CustomError).type === ErrorType.PasswordInput) {
        setPassword(state => ({ ...state, error: getErrorMessage((error as CustomError).message) }))
      }
      if ((error as CustomError).type === ErrorType.Http) {
        setGlobalError((error as CustomError).message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setShowSuccess(false), 2000)
    }
  }, [showSuccess])

  useEffect(() => {
    if (globalError.trim()) {
      setTimeout(() => setGlobalError(''), 2000)
    }
  }, [globalError])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {showSuccess && <Flash variant='success'>Autenticado com sucesso!</Flash>}
        {globalError.trim() && <Flash variant='danger'>{globalError}</Flash>}

        <Text margin={'auto'}>🐸</Text>

        <FormControl id='username'>
          <FormControl.Label htmlFor="username">Nome de usuário:</FormControl.Label>
          <TextInput block value={username.value} onChange={onChangeUsername} />
          {username.error.trim() && (
            <FormControl.Validation id="username" variant="error">
              {username.error}
            </FormControl.Validation>
          )}
        </FormControl>

        <FormControl id='password'>
          <FormControl.Label htmlFor="password">Senha:</FormControl.Label>
          <TextInput
            block
            type={isVisible ? 'text' : 'password'}
            value={password.value}
            onChange={onChangePassword}
            trailingAction={
              <TextInput.Action
                aria-label={isVisible ? 'Esconder senha' : 'Mostrar senha'}
                icon={isVisible ? EyeClosedIcon : EyeIcon}
                onClick={() => setIsVisible(prevState => !prevState)}
              />
            }
          />
          {password.error.trim() && (
            <FormControl.Validation id="password" variant="error">
              {password.error}
            </FormControl.Validation>
          )}
        </FormControl>

        <Button block disabled={isLoading} onClick={handleLogin} variant="primary">
          {isLoading ? 'Autenticando...' : 'Login'}
        </Button>
      </Box>
    </Box>
  )
}