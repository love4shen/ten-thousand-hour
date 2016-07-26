import { connect } from 'react-redux'
import { addGoal, updateProgress, setTimer, clearTimer } from '../actions'
import Dashboard from '../components/Dashboard'

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGoalClick: (title) => {
      dispatch(addGoal(title));
    },
    onUpdateProgressClick: (id, updatedProgress) => {
      dispatch(updateProgress(id, updatedProgress));
    },
    setTimerHelp: (id, timer) => {
      dispatch(setTimer(id, timer));
    },
    clearTimerHelp: (id) => {
      dispatch(clearTimer(id));
    },
  }
};

const DashboardWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardWrapper;
