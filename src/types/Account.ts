type Account = {
  id?: number
  codeString: string
  codeUser: string
  name: string
  type: string
  release: number
  parentId: number | null
}

export default Account