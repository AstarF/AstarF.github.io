import * as React from 'react'
import { useRef, useEffect, useState, ReactNode } from 'react'
import { Comments } from 'pliny/comments'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import LeftNav from '@/components/LeftNav'


const editUrl = (path) => `${siteMetadata.siteRepo}/blob/master/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

//显隐
let savestatus = false;

export default function PostLayoutCenter({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, auther_bref, title_img } = content
  const basePath = path.split('/')[0]
  const [loadComments, setLoadComments] = useState(false)
  const [ids, setIds] = React.useState<Array<{ id: string; title: string }>>([])

  React.useEffect(() => {
    const titles = content.toc
    const idArrays = Array.prototype.slice
      .call(titles)
      .map((title) => {
        return ({ value: title.value, url: title.url, depth: title.depth })
      }) as Array<{
        id: string
        title: string
      }>
    setIds(idArrays)
  }, [])

  //显隐
  const [isSticky, setIsSticky] = savestatus ? useState(true) : useState(false)
  const ref = useRef()
  useEffect(() => {
    const onScroll = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      if (scrolled > 0.05) {
        setIsSticky(true)
        savestatus = true
      } else {
        setIsSticky(false)
        savestatus = false
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isSticky])

  return (
    <div className="xl:grid xl:grid-cols-6 xl:gap-4">
      <div className='xl:col-start-1 xl:col-span-1  ml-16 '>
        <div className='xl:h-72 xl:mt-64'>
        </div>
        <div className="sticky top-[150px] pt-4 mb-2 xl:pt-8 float-right ">
          <div className={isSticky ? 'leftNav isSticky' : 'leftNav'} ref={ref}>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 float-left border-b-solid border-b
           border-pink-500 dark:border-indigo-600'>
              目录
            </span>
            <div className='h-1'></div>
            <div className="hidden xl:block">
              <LeftNav ids={ids} />
            </div>
            <Link
              href={`/${basePath}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="Back to the blog"
            >
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 float-left'>
                Back to the blog&rarr;
              </span>
            </Link>
          </div>
        </div>

      </div>
      <div className='xl:col-start-2 xl:col-span-4'>
        <SectionContainer>
          <BlogSEO url={`${siteMetadata.siteUrl}/${path}`} authorDetails={authorDetails} {...content} />
          <ScrollTopAndComment />
          <article className='xl:mx-20'>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <header className="mt-5 pt-6 xl:pb-6">
                <div className="mb-5  border-b-solid border-b">
                  {(next || prev) && (
                    <div className="flex justify-between py-4 ">
                      {prev && (
                        <span className='inline float-left w-80 truncate'>
                          <span className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mr-1">
                            Previous:
                          </span>
                          <span className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/${prev.path}`}>
                              <span className='text-primary-500 dark:text-primary-300'>
                                {prev.title}
                              </span></Link>
                          </span>
                        </span>
                      )}
                      {next && (
                        <span className='inline float-right w-80 truncate'>
                          <span className="font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mr-1">
                            Next:
                          </span>
                          <span className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/${next.path}`}>
                              <span className='text-primary-500 dark:text-primary-300'>
                                {next.title}
                              </span>
                            </Link>
                          </span>

                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-center">
                  <dl className="space-y-10 pt-5">
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div>
                    <PageTitle>{title}</PageTitle>
                  </div>

                  <div className=''>
                    {tags && (
                      <div className="py-4 xl:py-8">

                        <div className="flex flex-wrap place-content-center">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
                <div className='mt-16 shadow-xl shadow-primary-500/50 rounded-lg' uk-parallax="start: 100%;bgy: -300;blur: 0,20;media:(min-aspect-ratio: 3/5) and (max-aspect-ratio: 3/1);">
                  <Image
                    alt={title}
                    src={title_img}
                    className="object-cover object-center rounded-lg"
                    width={1024}
                    height={768}
                  />
                </div>
              </header>
              <div className="">
                {/* grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 */}
                <div className='pt-10'>
                  <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">Authors</h1>
                  <dl className="pt-6 pb-5 xl:pt-5 xl:dark:border-gray-700">
                    <dt className="sr-only">Authors</dt>
                    <dd>
                      <ul className="flex flex-wrap justify-left gap-4 sm:space-x-12 block xl:space-x-0 xl:space-y-8">
                        {authorDetails.map((author) => (
                          <li className="flex items-left space-x-2 border-b border-gray-200 p-3" key={author.name}>
                            {author.avatar && (
                              <Image
                                src={author.avatar}
                                width={100}
                                height={100}
                                alt="avatar"
                                className="h-14 w-14 rounded-full"
                              />
                            )}
                            <dl className="whitespace-nowrap text-sm font-medium leading-5">
                              <dt className="sr-only">Name</dt>
                              <dd className="text-gray-900 dark:text-gray-100">
                                <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 mr-1 font-semibold text-2xl'>
                                  {author.name}
                                </span>
                              </dd>
                              <dt className="sr-only">Twitter</dt>
                              <dd>
                                {author.twitter && (
                                  // <Link
                                  //   href={author.twitter}
                                  //   className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                  // >
                                  //   {author.twitter.replace('https://twitter.com/', '@')}
                                  // </Link>
                                  <Link
                                    href={author.twitter}
                                    className="text-pink-500 dark:text-indigo-600"
                                  >
                                    @bilibili
                                  </Link>
                                )}
                              </dd>
                            </dl>
                            <dl className='text-primary-500 hover:text-primary-600 pl-5 italic'>{auther_bref}</dl>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
                  <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
                  <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                    <Link href={discussUrl(path)} rel="nofollow">
                      <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>
                        Discuss on Twitter
                      </span>

                    </Link>
                    <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>
                      {` • `}
                    </span>
                    <Link href={editUrl(filePath)}>
                      <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>
                        View on GitHub
                      </span>
                    </Link>
                    <Link
                      href={`/${basePath}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label="Back to the blog"
                    >
                      <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 float-right'>
                        &larr;Back to the blog
                      </span>
                    </Link>
                  </div>
                  {siteMetadata.comments && (
                    <div
                      className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                      id="comment"
                    >
                      {!loadComments && (
                        <button onClick={() => setLoadComments(true)}>Load Comments</button>
                      )}
                      {loadComments && <Comments commentsConfig={siteMetadata.comments} slug={slug} />}
                    </div>
                  )}
                </div>
                <footer>

                </footer>
              </div>
            </div>
          </article>
        </SectionContainer>
      </div>
    </div>
  )
}
