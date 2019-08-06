import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {

  const combinedReducers = combineReducers({
    dishes: Dishes,
    comments: Comments,
    promotions: Promotions,
    leaders: Leaders,
    ...createForms({
      feedbacks: InitialFeedback
    })
  });

  const store = createStore(combinedReducers, applyMiddleware(thunk, logger));
  return store;
}
