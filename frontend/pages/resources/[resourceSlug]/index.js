import { useState, useEffect } from 'react'
import { getProgramArray } from '@/fetch/requests'
import FullScreenBack from '@/components/background/FullScreenBack'
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/nav/NavBar'
import fakeData from '@/data/fakeData'
import { useRouter } from 'next/router'
import Box from '@/components/generic/Box'
import styled from 'styled-components'

const ResourcePage = () => {
	// ex: /resource/program

	const [ programsArray, setProgramsArray ] = useState([])

	const router = useRouter() 
	const { resourceSlug } = router.query

	useEffect(() => {
		if (!router?.query?.resourceSlug) return 
		getPrograms() 
	}, [router.query]) 

	const getPrograms = async () => {
		const { resourceSlug } = router.query
		const singularSlug = resourceSlug[resourceSlug.length - 1] === 's' 
			? resourceSlug.slice(0, resourceSlug.length - 1) 
			: resourceSlug
		try {
			const data = await getProgramArray('programs/resources', singularSlug) 
			if (!data || !data.message.length) {
				return 
			}
			const approvedPrograms = data.message.filter( program => program.approved === true )
			setProgramsArray(approvedPrograms)
		} catch (error) {
			console.log('ERROR IN GETPROGRAMS: ', error)
		}
	}
	
	return (
		<>
			<NavBar />
			<FullScreenBack 
				src={ fakeData[resourceSlug].coverImage }
				titleInfo={{ 
					show: true, 
					text: `${resourceSlug}`, 
					backgroundColor: '#0077B6', 
					color: 'white' 
				}}
			/>
			{ programsArray[0] && (
				<Grid>
						{ programsArray.map(( program ) => (
							<PhotoWithTextBox 
								key={program.href} 
								coverImage={program.coverImage} 
								program={program} 
							/>
						))}					
				</Grid>
			)}
		<Footer/>

		</>
	)
}

export default ResourcePage 

const Grid = styled.div`
	display: grid; 
	grid-template-columns: repeat(3, 1fr);
	width: 1400px; 
	max-width: 90%; 
	margin: 80px auto 0 auto; 
	align-items: center; 

	@media screen and (max-width: 1300px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 820px) {
		grid-template-columns: repeat(1, 1fr);
	}
`