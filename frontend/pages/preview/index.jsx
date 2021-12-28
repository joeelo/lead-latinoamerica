import { useState, useEffect, useCallback } from 'react';
import Footer from '@/components/footer/Footer';
import NavBar from '@/components/nav/NavBar';
import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo';
import windowHasLoaded from '@/utils/windowHasLoaded';
import SkewedTitleAndPhoto from '@/components/content/program/SkewedTitleAndPhoto';

const PreviewPage = () => {
  const [program, setProgram] = useState({});
  const hasWindowLoaded = windowHasLoaded();

  const pullLocalStorage = useCallback(() => {
    if (hasWindowLoaded) {
      const local = console.log(localStorage);
      const organization = localStorage.getItem('organization');
      const missionStatement =
        localStorage.getItem('missionStatement') ||
        'mission statement will go here';
      const bio = localStorage.getItem('bio') || 'Your bio will be here!';

      setProgram({
        bio,
        organization,
        missionStatement,
        coverImage:
          'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
        ...program,
      });
    }
  }, [hasWindowLoaded]);

  useEffect(() => {
    pullLocalStorage();
  }, [pullLocalStorage]);

  return (
    <>
      <NavBar />
      <SkewedTitleAndPhoto program={program} />
      <ProgramOverviewAndInfo program={program} />
      <Footer />
    </>
  );
};

export default PreviewPage;
