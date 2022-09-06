import { useState, useEffect } from "react";
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { getProgramBySlug } from "@/fetch/requests";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo";
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto";
import FaButton from "@/components/buttons/FaButton";
import Modal from "@/components/modal/Modal";

const DeleteOrgPage = () => {
	const router = useRouter()
	const [ program, setProgram ] = useState({}) 
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
	}, [ router.isReady ])

	if (!program) {
		return null
	}

	return (
		<>
			<NavBar />
			<ProgramTitleAndPhoto program={ program } router={ router }/>
			<ProgramOverviewAndInfo program={ program } marginTop={ true }/>
			<ButtonContainer onClick={() => setIsModalOpen(true)}>
					<FaButton size="2x" color="white"/>
			</ButtonContainer>
			<Modal isOpen={isModalOpen} setOpen={setIsModalOpen}> truth fam </Modal>
			<Footer marginTop={ true }/>
		</>
	)
}

export default DeleteOrgPage

const ButtonContainer = styled.div`
	width: 75px; 
	height: 75px; 
	border-radius: 50%; 
	background-color: #CE1620;
	display: flex; 
	justify-content: center; 
	align-items: center; 
	position: fixed; 
	top: 120px; 
	right: 50px; 

	:hover {
			cursor: pointer;
	}
`

