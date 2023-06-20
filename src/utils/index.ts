import Account from '../types/Account'

export const generateCodeString = (code: string) => {
  const codeSplit = code.split('.')

  let codeString = ''
  const codes: string[] = []

  codeSplit.forEach(item => {
    codes.push(item.padStart(3, '0'))
  })

  codeString = codes.join('.')

  return codeString
}

const incrementCodeRecursion = (version) => {
  const parts = version.split('.')
  const lastPart = parseInt(parts[parts.length - 1])

  if (lastPart < 999) {
    parts[parts.length - 1] = (lastPart + 1).toString()
    return parts.join('.')
  }

  if (parts.length === 1) {
    return '999'
  }

  const withoutLastPart = parts.slice(0, parts.length - 1).join('.')
  const incrementedWithoutLastPart = incrementCodeRecursion(withoutLastPart)

  return incrementedWithoutLastPart
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
  const newCode = !children ? code : children.codeUser


  const incrementRecursion = incrementCodeRecursion(newCode)
  const resultCode = incrementRecursion.split('.').filter(item => item !== '0').join('.')

  return resultCode
}