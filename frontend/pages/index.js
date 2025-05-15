import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import HomeScreenPage from '@/pages/HomeScreenPage'

export default HomeScreenPage

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
