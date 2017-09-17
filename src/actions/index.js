import {ADD_DIRECTION, EXTRA_SERVICE} from './actiontypes'

export function AddDirection(route) {
  return { type: ADD_DIRECTION, route }
}

export function Addservice(route) {
  return { type: EXTRA_SERVICE, route }
}
