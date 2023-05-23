import { pt_br } from "./sheets/keys/pt_br"

export function useError() {
  function getErrorMessage(errorMessageCode: string): string {
    if (Object.keys(pt_br).includes(errorMessageCode)) {
      return Object.getOwnPropertyDescriptor(pt_br, errorMessageCode)?.value
    }

    return pt_br.unknown_error
  }

  return {
    getErrorMessage,
  }
}