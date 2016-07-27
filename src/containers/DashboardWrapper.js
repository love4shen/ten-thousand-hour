import { connect } from 'react-redux';
import { addGoal, updateProgress, setTimer, clearTimer } from '../actions';
import Dashboard from '../components/Dashboard';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGoalClick: bindActionCreators(addGoal, dispatch),
    onUpdateProgressClick: bindActionCreators(updateProgress, dispatch),
    setTimerHelp: bindActionCreators(setTimer, dispatch),
    clearTimerHelp: bindActionCreators(clearTimer, dispatch),
  }
};

const DashboardWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardWrapper;
