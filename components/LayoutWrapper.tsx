import { Inter } from '@next/font/google'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
import ProgressBar from '@/components/ProgressBar'
interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: Props) => {
  return (
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <ProgressBar/>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    
  )
}

export default LayoutWrapper
