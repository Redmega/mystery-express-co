import './globals.css'
import { Shadows_Into_Light_Two } from 'next/font/google'

const font = Shadows_Into_Light_Two({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: 'Mystery Express, Co.',
  description: 'Can you solve the mystery?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
