import { useRouter } from 'next/router'
import { useQuery } from "react-query"
import ProgramRequests from 'src/fetch/program/ProgramRequests'

import FixedButton from "@/components/buttons/FixedButton"
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo"
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto"
import Footer from "@/components/footer/Footer"
import NavBar from "@/components/nav/NavBar"
import getToast from '@/utils/getToast'

const ApproveProgramPage = () => {
	const router = useRouter() 

	const { data } = useQuery({
		queryKey: ['fetchProgram', {name: router.query.nameSlug}], 
		queryFn: ProgramRequests.getProgram, 
		enabled: !!router.query.nameSlug
	})

	const handleSuccess = (response) => {
		if (!!response) {
			getToast({ message: 'Successfully updated!'})
		} else {
			getToast({ message: 'Something went wrong, please try again later', variant: 'error' }) 
		}
	}

	

	if (!data) {
		return <>Loading...</>
	}

	const program = data
	
	return (
		<>
			<NavBar />
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
				deny={true} 
				bgColor="#FF4F3D" 
				href={program.href}
				bgColorHover="#E82C4A"
				onSuccess={handleSuccess}
			/>
			<ProgramTitleAndPhoto program={program} router={router}/>
			<ProgramOverviewAndInfo program={program} marginTop={true}/>
			<Footer marginTop={true}/>
		</>
	)
}

export default ApproveProgramPage