export const formErrorHandler = (error: string) => {
  if (error.includes('UNIQUE') && error.includes('accounts.codeUser'))
    return {
      field: 'code',
      message: 'Este código já esta cadastrado'
    }
}