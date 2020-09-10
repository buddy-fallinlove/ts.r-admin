import { MenuItem, User } from "../../types"

export interface Action {
  type: string,
  payload: any
}

export interface State {
  menus: MenuItem[],
  users: User[],
  total: number,
  loading: boolean
}


const initState:State = {
  menus: [],
  users: [],
  total: 0,
  loading: true
}



export default function user(state = initState, action: Action) {
  switch (action.type) {
    case 'getMenus':
      return {
        ...state,
        menus: action.payload
      }
    case 'getUserList':
      return {
        ...state,
        users: action.payload.users,
        total: action.payload.total,
        loading: action.payload.loading
      }
    default:
      return { ...state }
  }
}