import * as React from 'react';

import LeaveList from './leaveList';

export default class LeaveManage extends React.Component {
  render() {
    return (
      <div className="leave-list-body">
        <span className="leave-list-title"> 请假的崽种,🦈 </span>
        <LeaveList />
      </div>
    )
  }
}