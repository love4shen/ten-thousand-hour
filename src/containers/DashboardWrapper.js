import { connect } from 'react-redux';
import { addGoal, deleteGoal, updateProgress, closeBanner, setTimer, clearTimer } from '../actions';
import Dashboard from '../components/Dashboard';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddGoalClick: bindActionCreators(addGoal, dispatch),
    onDeleteGoalClick: bindActionCreators(deleteGoal, dispatch),
    onUpdateProgressClick: bindActionCreators(updateProgress, dispatch),
    onCloseBannerClick: bindActionCreators(closeBanner, dispatch),
    setTimerHelp: bindActionCreators(setTimer, dispatch),
    clearTimerHelp: bindActionCreators(clearTimer, dispatch),
  }
};

const DashboardWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardWrapper;
