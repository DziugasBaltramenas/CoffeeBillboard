import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';

import { rootReducer, RootState } from 'app/reducers';

const defaultMiddlewares = [
    thunkMiddleware,
];

const composedMiddlewares = () =>
    process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(...defaultMiddlewares))
        : compose(applyMiddleware(...defaultMiddlewares));

const initialize = (
    history: History,
    initialState?: RootState,
) => createStore(rootReducer(history), initialState, composedMiddlewares());

export { initialize };
