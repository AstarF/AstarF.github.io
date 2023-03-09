import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO' //搜索引擎优化
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata' //元数据配置，个人信息，相关网站
import SectionContainer from '@/components/SectionContainer'
import { formatDate } from 'pliny/utils/formatDate'
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer'
import { InferGetStaticPropsType } from 'next'
import { NewsletterForm } from 'pliny/ui/NewsletterForm'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import { kebabCase } from 'pliny/utils/kebabCase'
const MAX_DISPLAY = 5

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      {/* Head */}
      <div className="ppage-topback pt-16 sm:pt-32" uk-parallax="bgy: -100;blur: 20;media:(min-aspect-ratio: 3/5) and (max-aspect-ratio: 3/1);">
        <h1 className="ppage-shadow-text text-center text-3xl font-extrabold tracking-tight text-gray-100 dark:text-gray-100 sm:text-4xl md:text-6xl  ">
          Hello World, Hello Frieads
        </h1>

        <div className="ppage-shadow-text ppage-topback-title mt-14 text-sm sm:mt-20 md:mt-28 md:text-2xl"> {siteMetadata.description}</div>


        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">

        </p>
      </div>
      {/* Blog list */}
      <SectionContainer>
        <div className='text-center hidden sm:block sm:p-8 sm:pt-32 md:pd-16'>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 px-4 py-3 text-3xl sm:text-5xl  font-extrabold">
            记录，由此开始
          </span>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            // className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {/* Link Of All Posts */}
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6 mb-16">
            {/* <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link> */}
            <Link
              href="/blog"
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 text-xl"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>


          </div>
        )}
        {/* Mail */}
        <div className='text-center hidden sm:block md:block md:pb-16 md:pt-8 min-w-360'>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 px-4 py-3 sm:text-2xl md:text-4xl xl:text-5xl font-medium italic ">
            "Je pense, donc je suis."
          </div>
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500 px-4 py-3 sm:text-1xl md:text-2xl xl:text-3xl font-medium italic ">
            ——Renatus Cartesius
          </div>
        </div>

        <div className="flex items-center justify-center">
          {/* <label>
            <span className="sr-only">Search articles</span>
            <input
              aria-label="Search articles"
              type="text"
              // onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="transition_05 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:shadow-lg hover:shadow-primary-500/50"
            />
          </label> */}
          <Link
            href={`/blog/`}
            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <span className='transition_05 p-2.5 rounded-lg px-8 bg-gradient-to-r from-indigo-600 to-pink-500 hover:shadow-lg hover:shadow-pink-500/50 dark:hover:shadow-indigo-600/50 ml-5 text-white text-lg'>GET MORE</span>
          </Link>
          {/* <NewsletterForm /> */}
        </div>

      </SectionContainer>
    </>
  )
}
