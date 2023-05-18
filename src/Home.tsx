import { Box, Button, FormControl, Text, TextInput } from "@primer/react";
import { useState } from "react";

export function Home() {
  const [username, setUsername] = useState({ value: '', error: '' } )
  const [password, setPassword] = useState({ value: '', error: '' })
  
  function onChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername({ value: event.target.value, error: '' })
  }

  function onChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword({ value: event.target.value, error: '' })
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      <Text>🐸</Text>
      
      <FormControl>
        <FormControl.Label>Username:</FormControl.Label>
        <TextInput value={username.value} onChange={onChangeUsername} />
      </FormControl>

      <FormControl>
        <FormControl.Label>Senha:</FormControl.Label>
        <TextInput type='password' value={password.value} onChange={onChangePassword} />
      </FormControl>

      <Button variant="primary">Login</Button>
    </Box>
  )
}