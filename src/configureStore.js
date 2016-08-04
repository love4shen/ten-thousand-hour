import {
  createStore,
  compose,
} from 'redux';
import { AsyncStorage } from 'react-native';
import tenKHApp from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';

const configureStore = () => {
  const store = autoRehydrate()(createStore)(tenKHApp, { goals: [{
    name: 'Welcome! This is a sample goal.',
    id: 'tinirlove',
    progress: 0,
    interval: undefined,
    isTiming: false,
    shouldShowBanner: true,
  }] });
  persistStore(store, {storage: AsyncStorage});

  return store;
}

export default configureStore;
