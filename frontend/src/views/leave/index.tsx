import * as React from 'react';

import ApplyLeave from './applyLeave';
import LeaveList from './leaveList';

export default class LeaveManage extends React.Component {
  render() {
    return (
      <>
        <div className="leave-list-body">
          <span className="leave-list-title"> 请假列表💼,🦈 </span>
          <LeaveList />
        </div>
        <ApplyLeave />
      </>
    )
  }
}