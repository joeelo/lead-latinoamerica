import FullScreenBack from '@/components/background/FullScreenBack';
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox';
import Footer from '@/components/footer/Footer';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import fakeData from '@/data/fakeData';
import { useRouter } from 'next/router';

const ResourcePage = () => {

  const router = useRouter(); 
  const { resourceSlug } = router.query;

	return (
		<>
		<NavBar />
			{ fakeData[resourceSlug] && 
				<>
					<FullScreenBack 
						src={ fakeData[resourceSlug].coverImage }
						titleInfo={{ show: true, text: `${ resourceSlug }`, backgroundColor: '#0077B6', color: 'white' }}
					/>

					<CenterFlexContainer padding='extraPad'>
						{ fakeData[resourceSlug].programs.map(( program, index ) => 
							<PhotoWithTextBox key={ program.href } coverImage={ program.coverImage } program={ program } />
						)}
					</CenterFlexContainer>
					
				</>
			}
		<Footer/>

		</>
	)
}

export default ResourcePage; 