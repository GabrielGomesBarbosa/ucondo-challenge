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