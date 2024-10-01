import { useCallback, useEffect, useState } from 'react'

import ProgramOverviewAndInfo from '@/components/content/program/ProgramOverviewAndInfo'
import ProgramTitleAndPhoto from '@/components/content/program/ProgramTitleAndPhoto'
import windowHasLoaded from '@/utils/windowHasLoaded'

const PreviewPage = () => {
  const [program, setProgram] = useState({})
  const hasWindowLoaded = windowHasLoaded()

  const pullLocalStorage = useCallback(() => {
    if (hasWindowLoaded) {
      const organization = localStorage.getItem('organization')
      const missionStatement =
        localStorage.getItem('missionStatement') ||
        'mission statement will go here'
      const bio = localStorage.getItem('bio') || 'Your bio will be here!'
      const helpsWith = JSON.parse(localStorage.getItem('helpsWith')) || []

      setProgram({
        bio,
        organization,
        missionStatement,
        helpsWith: helpsWith || [],
        coverImage:
          'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80',
        ...program,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasWindowLoaded])

  useEffect(() => {
    pullLocalStorage()
  }, [pullLocalStorage])

  return (
    <>
      <ProgramTitleAndPhoto program={program} />
      <ProgramOverviewAndInfo program={program} preview />
    </>
  )
}

export default PreviewPage
