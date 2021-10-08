import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action type
const SHOW = "modal/SHOW";
const CLOSE = "modal/CLOSE";

// action creator
const showModal = createAction(SHOW, (id) => ({ id }));
const closeModal = createAction(CLOSE);

// initialState
const initialState = {
  modalVisibility: false,
  currentId: "",
};

// reducer
export default handleActions(
  {
    [SHOW]: (state, action) =>
      produce(state, (draft) => {
        draft.modalVisibility = true;
        draft.currentId = action.payload.id;
      }),
    [CLOSE]: (state, action) =>
      produce(state, (draft) => {
        draft.modalVisibility = false;
      }),
  },
  initialState
);

export const actionCreators = {
  showModal,
  closeModal,
};
