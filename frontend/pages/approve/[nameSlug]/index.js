import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getProgramBySlug } from "@/fetch/requests";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
// import ProgramOverViewAndInfo from "@/components/content/program/ProgramOverviewAndInfo";
import SkewedTitleAndPhoto from "@/components/content/program/SkewedTitleAndPhoto";

const ApproveProgramPage = () => {

    const router = useRouter(); 
    const [ program, setProgram ] = useState({}); 

    const getProgram = async () => {
        try {
            console.log(router.query);
            const fetchedProgram = await getProgramBySlug(`program/${ router.query.nameSlug }`);
            console.log('fetchedProgram: ', fetchedProgram); 
            setProgram(fetchedProgram.program);
            return fetchedProgram; 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!router.isReady) return;
        getProgram(); 
    }, [ router.isReady ])

    console.log('program: ', program);

    if (!program) return <></>
    return (
        <>
            <NavBar />
            <SkewedTitleAndPhoto program={ program } router={ router }/>
            {/* <ProgramOverViewAndInfo program={ program } marginTop={ true }/> */}
            <Footer marginTop={ true }/>
        </>
        
    )
}

export default ApproveProgramPage;