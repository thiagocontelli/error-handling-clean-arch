import { BaseStyles, ThemeProvider } from "@primer/react";
import { Home } from "./Login";

export function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Home />
      </BaseStyles>
    </ThemeProvider>
  )
}
