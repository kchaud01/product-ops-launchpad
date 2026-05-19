import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Product Operations Command Hub',
  description: 'Strategic Pillar Mapping, Milestone Execution Grid, and BI Data Ingestion Node',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
