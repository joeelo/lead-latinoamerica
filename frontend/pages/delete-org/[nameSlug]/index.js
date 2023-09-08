import Box from "@mui/material/Box"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import FaButton from "@/components/buttons/FaButton"
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo"
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto"
import Footer from "@/components/footer/Footer"
import Modal from "@/components/modal/Modal"
import NavBar from "@/components/nav/NavBar"
import { getProgramBySlug } from "@/fetch/requests"

const DeleteOrgPage = () => {
	const router = useRouter()
	const [program, setProgram] = useState({}) 
	const [isModalOpen, setIsModalOpen] = useState(false)

	const getProgram = async () => {
		try {
			const fetchedProgram = await getProgramBySlug(`program/${ router.query.nameSlug }`)
			setProgram(fetchedProgram.program)
			return fetchedProgram 
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
			if (!router.isReady) return
			getProgram() 
			
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady])

	if (!program) {
		return null
	}

	return (
		<>
			<NavBar />

			<ProgramTitleAndPhoto program={program} router={router}/>
			<ProgramOverviewAndInfo program={program} marginTop={true}/>
			<Box 
				width={75} 
				height={75} 
				border-radius='50%'
				background-color='#CE1620'
				display='flex'
				justify-content='center'
				align-items='center'
				position='fixed'
				top={120} 
				right={50} 
				style={{ cursor: 'pointer' }}
				onClick={() => setIsModalOpen(true)}
			>
				<FaButton size="2x" color="white"/>
			</Box>
			<Modal isOpen={isModalOpen} setOpen={setIsModalOpen}> truth fam </Modal>
			<Footer />
		</>
	)
}

export default DeleteOrgPage
