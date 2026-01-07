import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'React Web Tabs',
    template: '%s – React Web Tabs',
  },
  description: 'Modular and accessible React tabs component',
}

const navbar = (
  <Navbar
    logo={<b>React Web Tabs</b>}
    projectLink="https://github.com/thatguyinabeanie/react-web-tabs"
  />
)

const footer = <Footer>MIT {new Date().getFullYear()} © React Web Tabs.</Footer>

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/thatguyinabeanie/react-web-tabs/tree/master/content"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
