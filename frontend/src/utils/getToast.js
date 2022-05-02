/**
 * You must put React Toastify in the parent component
 * https://fkhadra.github.io/react-toastify/introduction
 */

import { toast } from 'react-toastify'

const getBackgroundColor = (variant) => {
    switch (variant) {
      case 'success':
        return '#43a23c'
      
      case 'error': 
        return '#cc0000'
    
      default:
        return '#43a23c'
    }
}

export default function getToast({ variant = 'success', message = '', opts}) {
  const options = {
    position: 'top-right',
    hideProgressBar: true,
    style: { background: getBackgroundColor(variant), color: 'white', zIndex: 10000 },
    ...opts
  }

  return toast(message, options)
}