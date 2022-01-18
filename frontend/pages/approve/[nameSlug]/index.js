import { useRouter } from 'next/router';
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo";
import SkewedTitleAndPhoto from "@/components/content/program/SkewedTitleAndPhoto";
import FixedButton from "@/components/buttons/FixedButton";
import { useQuery } from "react-query";
import { getProgram } from 'src/fetch/program/ProgramRequests'
import { toast, ToastContainer } from "react-toastify";

const ApproveProgramPage = () => {

	const router = useRouter(); 

	const programDataQuery = useQuery(
		['fetchProgram', router.query.nameSlug], 
		getProgram, 
	)

	const successNotification = () => toast('Successfully Updated!', {
    position: 'top-right',
    hideProgressBar: true,
    style: { background: '#43a23c', color: 'white', zIndex: 10000 },
  });

	const failureNotification = () => toast('Something went wrong', {
		position: 'top-right',
    hideProgressBar: true,
		style: { background: '#cc0000', color: 'white', zIndex: 10000 },
	})

	const handleSuccess = (response) => {
		if (!!response) {
			successNotification();
		} else {
			failureNotification(); 
		}
	}

	

	if (!programDataQuery?.data?.program) return <></>
	return (
		<>
			<NavBar />
			<FixedButton 
					text="Approve Org"
					approve={true} 
					bgColor="#00B43C"
					href={programDataQuery.data.program.href} 
					bgColorHover="#0ACC14"
					onSuccess={handleSuccess}
			/>
			<FixedButton 
				text="Deny Org"
				deny={true} 
				bgColor="#FF4F3D" 
				href={programDataQuery.data.program.href}
				bgColorHover="#E82C4A"
				onSuccess={handleSuccess}
			/>
			<SkewedTitleAndPhoto program={programDataQuery.data.program} router={router}/>
			<ProgramOverviewAndInfo 
				program={programDataQuery.data.program} 
				marginTop={true}
			/>
			<Footer marginTop={true}/>
			<ToastContainer />
		</>
	)
}

export default ApproveProgramPage;