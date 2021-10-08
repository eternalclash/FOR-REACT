import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { firestore } from "../../shared/firebase";

const scheduleDB = firestore.collection("schedules");

// action type
const LOAD = "calendar/LOAD";
const ADD = "calendar/ADD";
const TOGGLE_MODE = "calendar/TOGGLE_MODE";
const CHECK = "calendar/CHECK";
// const EDIT = "calendar/EDIT";
const DELETE = "calendar/DELETE";

// action creator
const loadCalendar = createAction(LOAD, (schedules) => ({ schedules }));
const addCalendar = createAction(ADD, (schedule) => ({ schedule }));
const toggleMode = createAction(TOGGLE_MODE);
const checkCalendar = createAction(CHECK, (id) => ({ id }));
// const EditCalendar = createAction(EDIT, (new_schedule, id) => ({
//   new_schedule,
//   id,
// }));
const deleteCalendar = createAction(DELETE, (id) => ({ id }));

// connect firebase
const loadCalendarFB = () => (dispatch, getState) => {
  scheduleDB.get().then((docs) => {
    let schedules = [];
    docs.forEach((doc) => {
      if (doc.exists) {
        schedules = [...schedules, { ...doc.data(), id: doc.id }];
      }
    });
    dispatch(loadCalendar(schedules));
  });
};

const addCalendarFB = (schedule) => (dispatch, getState) => {
  scheduleDB
    .add({ ...schedule })
    .then((doc) => {
      const _schedule = { ...schedule, id: doc.id };
      dispatch(addCalendar(_schedule));
    })
    .catch((err) => console.log(err));
};

const checkCalendarFB = (id) => (dispatch, getState) => {
  const data = getState().calendar.scheduleList.find(
    (schedule) => schedule.id === id
  );

  scheduleDB
    .doc(id)
    .update({ isCompleted: !data.isCompleted })
    .then((res) => dispatch(checkCalendar(id)))
    .catch((err) => console.log(err));
};

const deleteCalendarFB = (id) => (dispatch, getState) => {
  scheduleDB.doc(id).delete();
  dispatch(deleteCalendar(id));
};

// initialState
const initialState = {
  scheduleList: [],
  mode: "all",
};

// reducer
export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = action.payload.schedules;
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList.push(action.payload.schedule);
      }),
    [TOGGLE_MODE]: (state, action) =>
      produce(state, (draft) => {
        draft.mode = draft.mode === "all" ? "completed" : "all";
      }),
    [CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = draft.scheduleList.map((schedule) =>
          schedule.id === action.payload.id
            ? { ...schedule, isCompleted: !schedule.isCompleted }
            : schedule
        );
      }),
    [DELETE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = draft.scheduleList.filter(
          (schedule) => schedule.id !== action.payload.id
        );
      }),
  },
  initialState
);

export const actionCreators = {
  toggleMode,
  loadCalendarFB,
  addCalendarFB,
  checkCalendarFB,
  deleteCalendarFB,
};
