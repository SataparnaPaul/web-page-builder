import { FETCH_COMPONENTS_SUCCESS, FETCH_COMPONENTS_FAIL } from '../actions/types';

const initialState = {
  components: [],
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case FETCH_COMPONENTS_SUCCESS:
      return {
        ...state,
        components: payload,
        error: null
      };
    case FETCH_COMPONENTS_FAIL:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
