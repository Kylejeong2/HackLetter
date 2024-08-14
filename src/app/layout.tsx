import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/components/Provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:
    'HackLetter - The best of HackerNews right in your inbox',
  description:
    'Enter your email and get the Top 5 stories on HackerNews, Summarized with AI and sent right to your Inbox. Read the past HackLetters through the Archive.',
  icons: {
    icon:['/favicon.ico?v=4'],
    apple:['apple-touch-icon.png?v=4'],
    shortcut:['apple-touch-icon.png']
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <Provider>
          <Analytics />
          <body className={`${inter.className} overflow-x-hidden`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main
              className={`flex min-h-screen flex-col ${inter.className} overflow-x-hidden`}
            >
              <Header />
              <div className="flex flex-1 justify-center w-full">
                <div className="flex w-full max-w-[1280px] h-full">
                  {children}
                </div>
              </div>
              <Footer />
            </main>
          </ThemeProvider>
        </body>
        </Provider>
        
      </html>    
  )
}

