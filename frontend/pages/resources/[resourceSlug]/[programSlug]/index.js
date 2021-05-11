import NavBar from '@/components/nav/NavBar';
import Footer from '@/components/footer/Footer';
import SkewedTitleAndPhoto from '@/components/content/SkewedTitleAndPhoto';

const ProgramPage = () => {
  return (
    <>
      <NavBar />
      <SkewedTitleAndPhoto />
      <Footer marginTop={ true }/>
    </>
  )
}

export default ProgramPage;