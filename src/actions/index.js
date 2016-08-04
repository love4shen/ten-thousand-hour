import uuid from 'uuid';

export const addGoal = (title) => ({
  type: 'ADD_GOAL',
  id: uuid.v4(),
  title,
});

export const deleteGoal = (id) => ({
  type: 'DELETE_GOAL',
  id,
});

export const updateProgress = (id, updatedProgress) => ({
  type: 'UPDATE_PROGRESS',
  id,
  updatedProgress,
});

export const closeBanner = (id) => ({
  type: 'CLOSE_BANNER',
  id,
});

export const setTimer = (id, timer) => ({
  type: 'SET_TIMER',
  id,
  timer,
});

export const clearTimer = (id) => ({
  type: 'CLEAR_TIMER',
  id,
});
