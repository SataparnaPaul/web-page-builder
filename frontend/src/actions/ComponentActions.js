import axios from 'axios';
import { FETCH_COMPONENTS_SUCCESS, FETCH_COMPONENTS_FAIL } from './types';

// Fetch components from backend
export const fetchComponents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/components');
    dispatch({ type: FETCH_COMPONENTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_COMPONENTS_FAIL, payload: err.response.data.message });
  }
};
