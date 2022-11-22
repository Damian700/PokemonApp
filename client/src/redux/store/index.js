import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk'; //middleware para asincronico?

const composeEnhancers =
//Tambien lo podría hacer con una libreria piola composeWithDevTools 
// que la saco de redux-devtools-extension (instala con npm i redux-devtools-extension)
//'redux-devtools-extension'
(typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
)

export default store;