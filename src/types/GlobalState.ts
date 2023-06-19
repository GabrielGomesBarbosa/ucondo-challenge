type GlobalState = {
  parentAccount: {
    id: number
    code: string
    label: string
  }
  accountType: 'Receita' | 'Despesa' | null
  loading: boolean
}

export default GlobalState