//This file should be used to connect to the redux state for Collab controls

//This Container should contain all the logic for setting the redux state or getting the redux state
export const DawTopbarContainer: React.FC = () => {
    //Call the Topbar component inside here and pass the redux props inside
    return null
}

// TopBarContainer.js
// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as modeActions from './modeActions'; // Import mode-related actions
// import TopBar from './TopBar'; // Import the presentational component
//
// const TopBarContainer = ({ mode, actions }) => {
//   const handleModeSwitch = () => {
//     const newMode = mode === 'local' ? 'global' : 'local';
//     actions.setMode(newMode);
//   };
//
//   return <TopBar mode={mode} onModeSwitch={handleModeSwitch} />;
// };
//
// const mapStateToProps = state => ({
//   mode: state.mode,
// });
//
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(modeActions, dispatch),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(TopBarContainer);