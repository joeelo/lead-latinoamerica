import { useRouter } from 'next/router';
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo";
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto";
import FixedButton from "@/components/buttons/FixedButton";
import { useQuery } from "react-query";
import { getProgram } from 'src/fetch/program/ProgramRequests'
import { ToastContainer } from "react-toastify";
import getToast from '@/utils/getToast';

const ApproveProgramPage = () => {

	const router = useRouter(); 

	const { data } = useQuery(
		['fetchProgram', router.query.nameSlug], 
		getProgram, 
	)

	const handleSuccess = (response) => {
		if (!!response) {
			getToast({ message: 'Successfully updated!'})
		} else {
			getToast({ message: 'Something went wrong, please try again later', variant: 'error' }) 
		}
	}

	if (!data?.program) return <></>
	const { program } = data; 
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
			<ToastContainer />

		</>
	)
}

export default ApproveProgramPage;