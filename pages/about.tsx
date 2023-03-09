// import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { MDXComponents } from '@/components/MDXComponents'
import SectionContainer from '@/components/SectionContainer'
const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SectionContainer>
      <MDXLayoutRenderer
        layout={author.layout || DEFAULT_LAYOUT}
        content={author}
        MDXComponents={MDXComponents}
      />
    </SectionContainer>

  )
}
