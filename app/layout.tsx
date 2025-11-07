import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLM Chat',
  description: 'Chat with an AI language model',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
