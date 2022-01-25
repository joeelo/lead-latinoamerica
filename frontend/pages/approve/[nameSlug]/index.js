import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProgramBySlug } from "@/fetch/requests";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo";
import ProgramTitleAndPhoto from "@/components/content/program/ProgramTitleAndPhoto";
import FixedButton from "@/components/buttons/FixedButton";
import { useQuery } from "react-query";
import { getProgram } from 'src/fetch/program/ProgramRequests'
import { toast, ToastContainer } from "react-toastify";

const ApproveProgramPage = () => {

	const router = useRouter(); 

	const { data } = useQuery(
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