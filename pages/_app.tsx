import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@/css/index.css'
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
// loads the Icon plugin
UIkit.use(Icons);
// import '@/css/docsearch.css' // Uncomment if using algolia docsearch
// import '@docsearch/css' // Uncomment if using algolia docsearch

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import { Analytics } from 'pliny/analytics'
import { SearchProvider } from 'pliny/search'
import LayoutWrapper from '@/components/LayoutWrapper'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      
      <Analytics analyticsConfig={siteMetadata.analytics} />
      {/* Header page Footer */}
      <LayoutWrapper>
        <SearchProvider searchConfig={siteMetadata.search}>
        <div style={{'height':'50px'}}></div>
          <Component {...pageProps} />
        </SearchProvider>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
