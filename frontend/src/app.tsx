import './app.css';

import * as React from 'react';
import { Route } from 'react-router-dom';

import Attendance from './views/attendance/index';
import DepManage from './views/department/index';
import EmpManage from './views/empManage/index';
import LeaManage from './views/leave/index';
import Login from './views/login/index';
import MyHeader from './views/myHeader';
import SidePane from './views/sidePane';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <MyHeader />
        <SidePane />
        <div className="mainBody">  
          <div className="Content">
            <Route path='/employee' component={EmpManage} />
            <Route path='/department' component={DepManage} />
            <Route path='/leave' component={LeaManage} />
            <Route path="/attendance" component={Attendance} />
            <Route path="/" component={Login} />
          </div>
        </div>
      </div>
    )
  }
}