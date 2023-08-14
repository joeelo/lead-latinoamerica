import { useEffect, useState } from 'react'

import { quotes } from '@/data/quotes'

const useGetRandomQuote = () => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }, [])

  return quote
}

export default useGetRandomQuote
