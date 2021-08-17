import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fakeData from '@/data/fakeData';
import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import SkewedTitleAndPhoto from '@/components/content/program/SkewedTitleAndPhoto';
import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo';

const ProgramPage = () => {
  const router = useRouter(); 
  const [ program, setProgram ] = useState({ name: '' });

  useEffect(() => {
    if ( !fakeData[router.query.resourceSlug] ) return;
    const programInfo = fakeData[router.query.resourceSlug].programs.find( p => p.href === router.query.programSlug )
    setProgram(programInfo);
  }, [router.query])

  if (!router.query) return <>Loading</>
  if ( !program ) return <>Loading</>
  return (
    <>
      <NavBar />
      <SkewedTitleAndPhoto program={ program } router={ router }/>
      <ProgramOverviewAndInfo program={ program } marginTop={ true }/>
      <Footer marginTop={ true }/>
    </>
  )
}

export default ProgramPage;