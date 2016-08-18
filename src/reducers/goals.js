import TimerMixin from 'react-timer-mixin';

const goals = (state = {}, action) => {
  let targetGoal;

  switch (action.type) {
    case 'ADD_GOAL':

    if (action.title.trim() === '') {
      return state;
    }

    return ({...state,
      [action.id]: {
        name: action.title,
        id: action.id,
        progress: 0,
        interval: undefined,
        isTiming: false,
        shouldShowBanner: true,
      },
    });

    case 'DELETE_GOAL':

    const stateCopy = {...state};
    delete stateCopy[action.id];

    return stateCopy;

    case 'UPDATE_PROGRESS':

    targetGoal = {
      ...state[action.id],
      progress: action.updatedProgress >= 0 ? action.updatedProgress : 0,
    };

    console.log('target update ' + targetGoal.progress);

    return {
      ...state,
      [action.id]: targetGoal,
    };

    case 'CLOSE_BANNER':

    targetGoal = {
      ...state[action.id],
      shouldShowBanner: false,
    };

    return {
      ...state,
      [action.id]: targetGoal,
    };

    case 'SET_TIMER':

    targetGoal = {
      ...state[action.id],
      interval: action.timer,
    };

    return {
      ...state,
      [action.id]: targetGoal,
    };

    case 'CLEAR_TIMER':

    TimerMixin.clearInterval(state[action.id].interval);

    targetGoal = {
      ...state[action.id],
      interval: undefined,
    };

    return {
      ...state,
      [action.id]: targetGoal,
    };

    default:
    return state;
  }
}

export default goals;
