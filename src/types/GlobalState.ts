import Option from './Option'

type GlobalState = {
  parentAccount: Option | null
  loading: boolean
}

export default GlobalState