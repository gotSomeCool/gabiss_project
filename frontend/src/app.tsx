import * as React from 'react';

import {Route} from 'react-router-dom';

import './app.css';

import SidePane from './views/sidePane';
import EmpManage from './views/empManage/index';
import DepManage from '../src/views/department/index';
import MyHeader from './views/myHeader';
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
          </div>
        </div>
      </div>
    )
  }
}