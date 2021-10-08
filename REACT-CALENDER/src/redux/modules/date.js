import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";

// action type
const SET_NOW = "date/SET_NOW";
const SET_CURRENT = "date/SET_CURRENT";

// action creators
const setNow = createAction(SET_NOW, () => ({ now: moment() }));
const setCurrent = createAction(SET_CURRENT, (date) => ({ date }));

// initialState
const initialState = {
  now: moment(),
  current: moment(),
};

// reducer
export default handleActions(
  {
    [SET_NOW]: (state, action) =>
      produce(state, (draft) => {
        draft.now = action.payload.now;
      }),
    [SET_CURRENT]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload.date;
      }),
  },
  initialState
);

export const actionCreators = {
  setNow,
  setCurrent,
};
