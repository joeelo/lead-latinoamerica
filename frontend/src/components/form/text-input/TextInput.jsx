import Box from '@mui/material/Box'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'

const TextInput = ({
  register,
  rules,
  setValue,
  name,
  label,
  placeHolder,
  initialVal,
  rows, 
  ...props
}) => {
  // register and hasError are properties of parent
  const theme = useContext(ThemeContext)

  const [isInFocus, setIsInFocus] = useState(false)

  useEffect(() => {
    if (initialVal) {
      setValue(name, initialVal)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialVal])

  const style = {
    width: '100%', 
    minHeight: 40, 
    height: 40, 
    fontSize: 16, 
    padding: '5px 5px 2px 5px', 
    marginBottom: 10, 
    border: 0, 
    outline: 'none',
    minHeight: rows ? rows * 30 : '' 
  }

  return (
    <Box 
      style={{ 
        paddingLeft: 10, 
        paddingTop: 10,  
        transition: '0.4s ease-in-out all', 
        borderRadius: 4, 
        boxShadow: isInFocus 
          ? '1px 2px 13px 0px rgba(184, 177, 184, 1)'
          : '1px 1px 4px 0px rgba(184, 177, 184, 1)',
      }}
    >
      {label && (
        <label 
          style={{ color: theme.colors.darkBlue, paddingLeft: 5, textTransform: 'capitalize' }}
        > 
          {label} 
        </label>
      )}

      {rows ? (
        <textarea
          {...register(name, rules)}
          placeholder={placeHolder}
          theme={theme}
          onFocus={() => setIsInFocus(true)}
          onBlur={() => setIsInFocus(false)}
          rows={rows}
          style={style}
          {...props}
        />
      ) : (
        <input
          {...register(name, rules)}
          placeholder={placeHolder}
          theme={theme}
          onFocus={() => setIsInFocus(true)}
          onBlur={() => setIsInFocus(false)}
          {...props}
          style={style}
        />
      )}

    </Box>
  )
}

export default TextInput
