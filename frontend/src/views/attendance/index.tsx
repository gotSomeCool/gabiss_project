import './index.css';

import { Tabs } from 'antd';
import * as React from 'react';

import Attend from './attend';
import ShowAttendance from './showAttendance';

const {TabPane} = Tabs;
export default class AttendanceManage extends React.Component {
  render() {
    return (
      <Tabs type="card">
          <TabPane 
            tab="打卡上下班"
            key="1"
          >
            <Attend />
          </TabPane>
           <TabPane 
            tab="查看考勤"                
            key="2"
          >
            <ShowAttendance />
          </TabPane>
        </Tabs>
    )
  }
}