type Account = {
  id?: number
  type: string
  hasParent: string
  codeString: string
  codeUser: string
  name: string
  release: string
  parentId: number | null
}

export default Account