import HomeScreenPage from '@/pages/HomeScreenPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default HomeScreenPage;

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
		},
	};
}