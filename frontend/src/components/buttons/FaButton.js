import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FaButton = ({ size, ...props }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faTrash} {...props} size={size} />
    </div>
  )
}

export default FaButton

