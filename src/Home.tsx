import { Box, Button, FormControl, Text, TextInput } from "@primer/react";
import { useState } from "react";
import { LoginUseCaseImpl } from "./LoginUseCaseImpl";

export function Home() {
  const useCase = new LoginUseCaseImpl()
  
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isLoading, setIsLoading] = useState(false)

  const errorCodes = {
    1: 'Insira um username válido',
    2: 'Insira uma senha válida'
  }
  
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
    } catch (error) {
      switch((error as Error).message) {
        case '1':
          setUsername(prevState => ({...prevState, error: errorCodes[1]}))
          break
        case '2':
          setPassword(prevState => ({...prevState, error: errorCodes[2]}))
          break
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      <Text>🐸</Text>
      
      <FormControl id='username'>
        <FormControl.Label htmlFor="username">Username:</FormControl.Label>
        <TextInput value={username.value} onChange={onChangeUsername} />
        {Boolean(username.error.trim()) && (
          <FormControl.Validation id="username" variant="error">
            {username.error}
          </FormControl.Validation>
        )}
      </FormControl>

      <FormControl id='password'>
        <FormControl.Label htmlFor="password">Senha:</FormControl.Label>
        <TextInput type='password' value={password.value} onChange={onChangePassword} />
        {Boolean(password.error) && (
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