import FullScreenBack from '@/components/background/FullScreenBack';
import PhotoWithTextBox from '@/components/content/PhotoWithTextBox';
import CenterFlexContainer from '@/components/generic/CenterFlexContainer';
import fakeData from '@/data/fakeData';
import { useRouter } from 'next/router';

const ResourcePage = () => {

  const router = useRouter(); 
  const { resourceSlug } = router.query;

  console.log('FAKEDATA: ', fakeData[resourceSlug]);
  return (
    <>
      { fakeData[resourceSlug] && 
        <>
          <FullScreenBack 
            src={ fakeData[resourceSlug].photo }
            titleInfo={{show: true, text: `${resourceSlug}`, backgroundColor: '#0077B6', color: 'white'}}
          />

          <CenterFlexContainer>
            { fakeData[resourceSlug].programs.map((obj, index) => 
                <PhotoWithTextBox key={obj.photo} src={obj.photo}/>
              )
            }
          </CenterFlexContainer>
          
        </>
      }


    </>
  )
}

export default ResourcePage; 