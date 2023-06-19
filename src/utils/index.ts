import Account from '../types/Account'

export const getCodeString = (code: string) => {
  const codeSplit = code.split('.')

  let codeString = ''
  const codes: string[] = []

  codeSplit.forEach(item => {
    codes.push(item.padStart(3, '0'))
  })

  codeString = codes.join('.')

  return codeString
}

const incrementLastIndex = (code: string) => {
  const codeSplit: string[] = code.split('.')
  const lastIndex: number = codeSplit.length - 1

  const newValue = parseInt(codeSplit[lastIndex]) >= 999 ? `${codeSplit[lastIndex]}.1` : `${parseInt(codeSplit[lastIndex]) + 1}`
  
  codeSplit[lastIndex] = newValue

  return codeSplit.join('.')
}

export const validateCode = (code: string) => {
  const splitCodes = code.split('.')

  const errors = splitCodes.filter(item => item.length > 3)

  if(errors.length > 0)
    return {
      error: true,
      field: 'code',
      message: 'Os códigos não podem conter mais que 3 dígitos por separação'
    }

  return {
    error: false
  }
}

export const incrementCode = (code: string, children: Account | null) => {
  let newCode = ''

  if (!children) {
    newCode = `${code}.1`
  } else {
    newCode = incrementLastIndex(children.codeUser)
  }

  return newCode
}