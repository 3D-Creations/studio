"use client"

import * as React from "react"
import { type ThemeProviderProps as NextThemesProviderProps } from "next-themes/dist/types"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
