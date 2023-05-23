import { en_us } from "./sheets/keys/en_us"

export function useError() {
  function getErrorMessage(errorMessageCode: string): string {
    if (Object.keys(en_us).includes(errorMessageCode)) {
      return Object.getOwnPropertyDescriptor(en_us, errorMessageCode)?.value
    }

    return en_us.unknown_error
  }

  return {
    getErrorMessage,
  }
}