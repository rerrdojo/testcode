import { ADD_DIRECTION, EXTRA_SERVICE} from './../actions/actiontypes'

let initialState = {
    direction : {},
    extraservice: {}
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_DIRECTION:
      return {...state, direction: action.route}
    case EXTRA_SERVICE:
      return {...state, extraservice: action.service}
    default:
      return state
  }
}

export default reducer