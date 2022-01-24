import { useState, useEffect } from 'react';
import { getProgramArray } from '@/fetch/requests';
import FullScreenBack from '@/components/background/FullScreenBack';
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox';
import Footer from '@/components/footer/Footer';
import NavBar from '@/components/nav/NavBar';
import fakeData from '@/data/fakeData';
import { useRouter } from 'next/router';
import Box from '@/components/generic/Box';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';

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
		const { resourceSlug } = router.query;
		const singularSlug = resourceSlug[resourceSlug.length - 1] === 's' 
			? resourceSlug.slice(0, resourceSlug.length - 1) 
			: resourceSlug;
		try {
			const data = await getProgramArray('programs/resources', singularSlug); 
			if (!data) {
				return; 
			}
			const approvedPrograms = data.message.filter( program => program.approved === true );
			setProgramsArray(approvedPrograms);
		} catch (error) {
			console.log('ERROR IN GETPROGRAMS: ', error);
		}
	}
	
	return (
		<>
		<NavBar />
			{ programsArray[0] && (
				<>
					<FullScreenBack 
						src={ fakeData[resourceSlug].coverImage }
						titleInfo={{ 
							show: true, 
							text: `${resourceSlug}`, 
							backgroundColor: '#0077B6', 
							color: 'white' 
						}}
					/>
					<Box 
						mt={40} 
						p='100px' 
						display="flex" 
						justify="space-around" 
						center
						wrap
					>
						{ programsArray.map(( program ) => (
							<PhotoWithTextBox 
								key={program.href} 
								coverImage={program.coverImage} 
								program={program} 
							/>
						))}
					</Box>
					
				</>
			)}
		<Footer/>

		</>
	)
}

export default ResourcePage; 