import { BaseStyles, ThemeProvider } from "@primer/react";
import { Login } from "./Login";

export function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Login />
      </BaseStyles>
    </ThemeProvider>
  )
}
