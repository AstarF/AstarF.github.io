import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/SectionContainer'
export default function Projects() {
  return (
    <>
      <SectionContainer>
        <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>兴趣使然</span>
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500'>这里是个人做/收集的一些项目,大部分项目均可直接下载使用</span>

            </p>
          </div>
          <div className="container py-12">
            <div className="-m-4 flex flex-wrap">
              {projectsData.map((d) => (
                <Card
                  key={d.title}
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
