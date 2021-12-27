import { useState, useEffect, useCallback } from 'react';
import Footer from '@/components/footer/Footer';
import NavBar from '@/components/nav/NavBar';
import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo';
import windowHasLoaded from '@/utils/windowHasLoaded';

const PreviewPage = () => {
  const [program, setProgram] = useState({});
  const hasWindowLoaded = windowHasLoaded();

  const pullLocalStorage = useCallback(() => {
    if (hasWindowLoaded) {
      const local = console.log(localStorage);
      // const getItem = localStorage.getItem();
    }
  }, [hasWindowLoaded]);

  useEffect(() => {
    pullLocalStorage();
  }, [pullLocalStorage]);

  return (
    <>
      <NavBar />
      <ProgramOverviewAndInfo program={program} />
      <Footer />
    </>
  );
};

export default PreviewPage;
