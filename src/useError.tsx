export function useError() {
  const errorCodes = {
    'invalid-username': 'Insira um username válido',
    'invalid-password': 'Insira uma senha válida',
    'invalid-email': 'Insira um e-mail válido',
    'username-not-found': 'Esse username não existe',
    'invalid-credentials': 'Credenciais Inválidas',
    'password-greater-than-8': 'A senha deve ter no máximo 8 caracteres',
    'username-greater-than-8': 'O username deve ter no máximo 8 caracteres',
    'unknown-error': 'Houve um erro desconhecido'
  }

  function getErrorMessage(errorMessageCode: string): string {
    if (Object.keys(errorCodes).includes(errorMessageCode)) {
      return Object.getOwnPropertyDescriptor(errorCodes, errorMessageCode)?.value
    }

    return errorCodes["unknown-error"]
  }

  return {
    getErrorMessage,
    errorCodes
  }
}