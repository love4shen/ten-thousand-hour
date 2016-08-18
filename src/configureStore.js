import {
  createStore,
  compose,
} from 'redux';
import { AsyncStorage } from 'react-native';
import tenKHApp from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';

const configureStore = () => {
  const store = autoRehydrate()(createStore)(tenKHApp, {});

  persistStore(store, {storage: AsyncStorage});

  return store;
}

export default configureStore;
