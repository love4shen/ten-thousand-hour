import TimerMixin from 'react-timer-mixin';

const goals = (state = [], action) => {
  let stateCopy;
  let targetIndex;
  switch (action.type) {
    case 'ADD_GOAL':

    if (action.title.trim() === '') {
      return state;
    }

    return [...state, {
      name: action.title,
      id: action.id,
      progress: 0,
      interval: undefined,
      isTiming: false,
      shouldShowBanner: true,
    }];

    case 'DELETE_GOAL':

    return state.filter(g => g.id !== action.id);

    case 'UPDATE_PROGRESS':
    stateCopy = state.slice();

    targetIndex = state.findIndex(goal => goal.id === action.id);
    stateCopy[targetIndex].progress = action.updatedProgress >= 0 ? action.updatedProgress : 0;

    return stateCopy;

    case 'CLOSE_BANNER':
    stateCopy = state.slice();

    targetIndex = state.findIndex(goal => goal.id === action.id);
    stateCopy[targetIndex].shouldShowBanner = false;

    return stateCopy;

    case 'SET_TIMER':
    stateCopy = state.slice();
    targetIndex = state.findIndex(goal => goal.id === action.id);
    stateCopy[targetIndex].interval = action.timer;
    return stateCopy;

    case 'CLEAR_TIMER':
    stateCopy = state.slice();
    targetIndex = state.findIndex(goal => goal.id === action.id);
    TimerMixin.clearInterval(stateCopy[targetIndex].interval);
    stateCopy[targetIndex].interval = undefined;
    return stateCopy;

    default:
    return state;
  }
}

export default goals;
