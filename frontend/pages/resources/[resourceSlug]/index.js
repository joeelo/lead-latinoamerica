import FullScreenBack from '@/components/background/FullScreenBack';
import fakeData from '@/data/fakeData';
import { useRouter } from 'next/router';

const ResourcePage = () => {

  const router = useRouter(); 
  const { resourceSlug } = router.query;

  console.log('FAKEDATA: ', fakeData, resourceSlug);
  return (
    <>
      { fakeData[resourceSlug] && 
        <FullScreenBack 
          src={ fakeData[resourceSlug].photo }
          titleInfo={{show: true, text: `${resourceSlug}`, backgroundColor: '#0077B6', color: 'white', position: 'absolute'}}

        />
      }
    </>
  )
}

export default ResourcePage; 