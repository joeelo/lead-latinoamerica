import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProgramBySlug } from "@/fetch/requests";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import ProgramOverviewAndInfo from "@/components/content/program/ProgramOverviewAndInfo";
import SkewedTitleAndPhoto from "@/components/content/program/SkewedTitleAndPhoto";
import FixedButton from "@/components/buttons/FixedButton";
import { useQuery } from "react-query";
import { getProgram } from 'src/fetch/program/ProgramRequests'

const ApproveProgramPage = () => {

	const router = useRouter(); 

	const { isLoading, data } = useQuery(
		['fetchProgram', router.query.nameSlug], 
		getProgram, 
		{
			enabled: router.isReady
		}
	)

	console.log('DATA:::', data); 

	if (!data?.program) return <></>
	return (
		<>
			<NavBar />
			<FixedButton 
					text={ 'Approve Org' } 
					approve={ true } 
					bgColor={ '#00B43C' } 
					href={ data.program.href } 
					bgColorHover={ '#0ACC14' }
			/>
			<FixedButton 
				text={ 'Deny Org'} 
				deny={ true } 
				bgColor={ '#FF4F3D' } 
				href={ data.program.href }
				bgColorHover={ '#E82C4A' } 
			/>
			<SkewedTitleAndPhoto program={ data.program } router={ router }/>
			<ProgramOverviewAndInfo program={ data.program } marginTop={ true }/>
			<Footer marginTop={ true }/>
		</>
	)
}

export default ApproveProgramPage;