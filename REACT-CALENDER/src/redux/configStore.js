import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {connectRouter} from "connected-react-router"
import Calendar from "./modules/calendar";
import Date from "./modules/date";
import Modal from "./modules/modal";
import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  calendar: Calendar,
  date: Date,
  modal: Modal,
  user: User,
  post: Post,
  image: Image,
  comment: Comment,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({history:history})]; //액션생성자에서 사용함

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, enhancer);

export default store;
