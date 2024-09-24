import { useRouter } from 'next/router'
import { useQuery } from "react-query"

import FixedButton from "@/components/buttons/FixedButton"
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo"
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto"
import { QueryKeys } from '@/config/QueryKeys'
import ProgramRequests from '@/requests/ProgramRequests'
import getToast from '@/utils/getToast'

const ApproveProgramPage = () => {
	const router = useRouter() 

	const programQuery = useQuery({
		queryKey: QueryKeys.PROGRAM, 
		queryFn: () => ProgramRequests.getBySlug(router.query.nameSlug), 
		enabled: !!router.query.nameSlug
	})

	const handleSuccess = (response) => {
		if (!!response) {
			getToast({ message: 'Successfully updated!'})
		} else {
			getToast({ message: 'Something went wrong, please try again later', variant: 'error' }) 
		}
	}

	const { data } = programQuery

	if (!data) {
		return <>Loading...</>
	}

	const program = data
	
	return (
		<>
			<FixedButton 
				text="Approve Program"
				approve={true} 
				bgColor="#00B43C"
				href={program.href} 
				bgColorHover="#0ACC14"
				onSuccess={handleSuccess}
			/>
			<FixedButton 
				text="Deny Program"
				approve={false} 
				bgColor="#FF4F3D" 
				href={program.href}
				bgColorHover="#E82C4A"
				onSuccess={handleSuccess}
			/>
			
			<ProgramTitleAndPhoto program={program} router={router}/>
			<ProgramOverviewAndInfo program={program} marginTop={true}/>
		</>
	)
}

export default ApproveProgramPage