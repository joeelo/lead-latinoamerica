import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import SkewedTitleAndPhoto from '@/components/content/SkewedTitleAndPhoto';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fakeData from '@/data/fakeData';

const ProgramPage = () => {
  const router = useRouter(); 
  const [ program, setProgram ] = useState({ name: '' });

  
  useEffect(() => {
    if (!router.query) return;
    const programInfo = fakeData[router.query.resourceSlug].programs.find(programs => programs.href === router.query.programSlug);
    setProgram(programInfo);
  }, [])

  if (!router.query) {
    return <></>
  }
  return (
    <>
      <NavBar />
      <SkewedTitleAndPhoto program={ program } router={ router }/>
      {/* <ProgramOverviewAndInfo program={ program } /> */}
      <Footer marginTop={ true }/>
    </>
  )
}

export default ProgramPage;