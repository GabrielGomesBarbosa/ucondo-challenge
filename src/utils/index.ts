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

export const incrementCode = (code: string) => {
  const codeSplit: string[] = code.split('.')
  const lastIndex: number = codeSplit.length - 1

  const incrementValue: number = parseInt(codeSplit[lastIndex]) + 1
  
  codeSplit[lastIndex] = incrementValue.toString()

  return codeSplit.join('.')
}