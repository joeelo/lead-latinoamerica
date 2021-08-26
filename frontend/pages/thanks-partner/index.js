import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import NavBar from '@/components/nav/NavBar'; 
import Footer from '@/components/footer/Footer';
import VideoBackground from '@/components/background/VideoBackground'; //child prop 
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import ChangingBackgroundText from '@/components/content/ChangingBackgroundText';

const ThanksPartnerPage = () => {

    const theme = useContext(ThemeContext);

    return (
        <>
            <NavBar/>
            <VideoBackground src='/pexels-pavel-danilyuk-7945680.mp4'> 
                <CenterFlexContainer align='center'>
                    <ChangingBackgroundText 
                        text={ 'Hooray! Thanks for Joining Us!' }
                        fontSize={ '24px' }
                        initialColor={ theme.colors.white }
                        secondaryColor={ theme.colors.darkBlue }
                        fontColorInitial={ theme.colors.darkBlue }
                        fontColorSecondary={ theme.colors.cultured }
                        onlyRunOneTransition={ true }
                    />
                </CenterFlexContainer>
            </VideoBackground >
            <Footer />
        </>
    )
}

export default ThanksPartnerPage;
