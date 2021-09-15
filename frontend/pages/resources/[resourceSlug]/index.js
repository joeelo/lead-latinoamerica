import { useState, useEffect } from 'react';
import { getProgramArray } from '@/fetch/requests';
import FullScreenBack from '@/components/background/FullScreenBack';
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox';
import Footer from '@/components/footer/Footer';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import NavBar from '@/components/nav/NavBar';
import fakeData from '@/data/fakeData';
import { useRouter } from 'next/router';

const ResourcePage = () => {
	// ex: /resource/program

	const [ programsArray, setProgramsArray ] = useState([]);

	const router = useRouter(); 
	const { resourceSlug } = router.query;

	useEffect(() => {
		if (!router?.query?.resourceSlug) return; 
		getPrograms(); 
	}, [router.query]) 

	const getPrograms = async () => {
		try {
			const data = await getProgramArray('programs/resources', router.query.resourceSlug); 
			setProgramsArray(data.message);
			console.log('PROGRAMS FETCHED: ', data.message); 
		} catch (error) {
			console.log('ERROR IN GETPROGRAMS: ', error);
		}
	}
	

	return (
		<>
		<NavBar />
			{ programsArray[0] && 
				<>
					<FullScreenBack 
						src={ fakeData[resourceSlug].coverImage }
						titleInfo={{ show: true, text: `${ resourceSlug }`, backgroundColor: '#0077B6', color: 'white' }}
					/>
					<CenterFlexContainer padding='extraPad'>
						{ programsArray.map(( program, index ) => 
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