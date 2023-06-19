type AccountWithChild = {
  id?: number
  type: string
  codeUserParent: string
  nameParent: string
  codeUserChild: string
  nameChild: string
  releaseParent: string
  releaseChild: number | null
}

export default AccountWithChild