import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tsuyaku Backend 2',
  description: 'Translation API Backend for Japanese Railway Announcements',
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