import * as react from "react";
import { ThemeProvider } from "./theme-provider";

export default function Provider({
  children,
}: Readonly<{
  children: react.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
