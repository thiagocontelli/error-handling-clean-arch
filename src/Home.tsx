import { Box, Button, Flash, FormControl, Text, TextInput } from "@primer/react";
import { useEffect, useState } from "react";
import { AuthRepositoryImpl } from "./AuthRepositoryImpl";
import { CustomError, ErrorType } from "./CustomError";
import { LoginUseCaseImpl } from "./LoginUseCaseImpl";
import { useError } from "./useError";

export function Home() {
  const repository = new AuthRepositoryImpl()
  const useCase = new LoginUseCaseImpl(repository)

  const { getErrorMessage } = useError()

  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [globalError, setGlobalError] = useState('')

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
      if ((error as CustomError).type === ErrorType.Username) {
        setUsername(state => ({ ...state, error: getErrorMessage((error as CustomError).message) }))
      }
      if ((error as CustomError).type === ErrorType.Password) {
        setPassword(state => ({ ...state, error: getErrorMessage((error as CustomError).message) }))
      }
      if ((error as CustomError).type === ErrorType.Global) {
        setGlobalError(getErrorMessage((error as CustomError).message))
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      {showSuccess && <Flash variant='success'>Autenticado com sucesso!</Flash>}
      {globalError.trim() && <Flash variant='danger'>{globalError}</Flash>}

      <Text>🐸</Text>

      <FormControl id='username'>
        <FormControl.Label htmlFor="username">Username:</FormControl.Label>
        <TextInput value={username.value} onChange={onChangeUsername} />
        {username.error.trim() && (
          <FormControl.Validation id="username" variant="error">
            {username.error}
          </FormControl.Validation>
        )}
      </FormControl>

      <FormControl id='password'>
        <FormControl.Label htmlFor="password">Senha:</FormControl.Label>
        <TextInput type='password' value={password.value} onChange={onChangePassword} />
        {password.error.trim() && (
          <FormControl.Validation id="password" variant="error">
            {password.error}
          </FormControl.Validation>
        )}
      </FormControl>

      <Button disabled={isLoading} onClick={handleLogin} variant="primary">
        {isLoading ? 'Autenticando...' : 'Login'}
      </Button>
    </Box>
  )
}