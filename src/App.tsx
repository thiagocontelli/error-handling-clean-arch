import { BaseStyles, ThemeProvider } from "@primer/react";
import { Home } from "./Home";

export function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <Home />
      </BaseStyles>
    </ThemeProvider>
  )
}
