// TODO: Come back to this file
import Box from "@mui/material/Box"
import { useRouter } from 'next/router'
import { useState } from "react"
import { useQuery } from "react-query"

import FaButton from "@/components/buttons/FaButton"
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo"
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto"
import Modal from "@/components/modal/Modal"
import { QueryKeys } from "@/config/QueryKeys"
import ProgramRequests from "@/requests/ProgramRequests"

const DeleteOrgPage = () => {
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const programQuery = useQuery({
		queryKey: QueryKeys.PROGRAM, 
		queryFn: () => ProgramRequests.getBySlug(router.query.nameSlug),
		enabled: !!router.query && !!router.query.nameSlug
	})

	const { data: program } = programQuery

	if (!program) {
		return null
	}

	return (
		<>
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
		</>
	)
}

export default DeleteOrgPage
