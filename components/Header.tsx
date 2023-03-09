import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from 'next/image'
import profilePic from '@/data/logo_x.png'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <header className="flex items-center justify-between py-1 fixed ppage-fixedheader">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image src={profilePic} alt="Logo" width={35} height={35} />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl text-gray-100 dark:text-gray-100 font-semibold sm:block">
                Astar's{siteMetadata.headerTitle}
                {/* <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>
                  
                </span> */}
              </div>
            ) : (
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>
                {siteMetadata.headerTitle}
              </span>
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-gray-100 dark:text-gray-100 sm:p-4"
            >
              <span className=''>
                {link.title}
              </span>
            </Link>
          ))}
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
