import { render, screen } from '@testing-library/react'
import ReactDOM from 'react-dom'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<Footer />, div)
    expect(screen.queryByTestId(/footer/i)).toBeTruthy()
  })
})
