import Link from 'next/link'
import { kebabCase } from 'pliny/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
   
      <Link
        href={`/tags/${kebabCase(text)}`}
        className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      >
         <span className='text-pink-500 dark:text-indigo-600 font-semibold'>{text.split(' ').join('-')}</span>
      </Link>
    

  )
}

export default Tag
