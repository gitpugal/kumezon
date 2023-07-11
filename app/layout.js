'use client'
import './globals.css'
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Kumezon.in',
//   description: 'Kumezon.in buy products here for free.',
// }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.ico" />
      </head>
      <Providers>
        <body className={`${inter.className} bg-black`}>
          {children}
          {/* <ScrollToTopButton /> */}
        </body>
      </Providers>
    </html>
  )
}


