import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import localFont from "next/font/local"
import { Mr_Dafoe } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { BOOT_SEEN_SCRIPT } from "@/lib/boot"

// codeman38's original "Press Start" — http://www.zone38.net/
const pressStart2P = localFont({
  src: "../public/fonts/PressStart.ttf",
  weight: "400",
  variable: "--font-press-start-2p",
  display: "swap",
})

// Script face for the Vice City easter egg.
const viceScript = Mr_Dafoe({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vice",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sahej Sodhi | Portfolio",
  description: "Data Scientist & Software Developer - Portfolio",
  icons: {
    icon: [
      { url: "/browser.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/browser.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Runs before first paint so the boot screen never flashes after it's been seen. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SEEN_SCRIPT }} />
      </head>
      <body className={`font-mono ${GeistSans.variable} ${GeistMono.variable} ${pressStart2P.variable} ${viceScript.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
