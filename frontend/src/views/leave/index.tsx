import { Tabs } from 'antd';
import * as React from 'react';

import ApplyLeave from './applyLeave';
import LeaveList from './leaveList';

const { TabPane } = Tabs;
export default class LeaveManage extends React.Component {
  render() {
    return (
      <>
        <Tabs type="card">
          <TabPane 
            tab="请假管理"
            key="1"
          >
            <div className="leave-list-body">
              <span className="leave-list-title"> 请假列表💼,🦈 </span>
              <LeaveList />
            </div>
          </TabPane>
           <TabPane 
            tab="申请请假"                
            key="2"
          >
            <div className="apply-leave-box">
              <ApplyLeave />
            </div>
          </TabPane>
        </Tabs>
      </>
    )
  }
}