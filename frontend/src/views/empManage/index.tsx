import * as React from 'react';

import {Attendance} from './EmployeeMange';
import {AddNewOne} from './addNewEmployee';
import {Tabs, Icon} from 'antd';
const {TabPane} = Tabs;

import '../style/empManage.css';

interface IState {
  // index: string
}
export default class empManage extends React.Component <{}, IState> {
  constructor (props: {}){
    super(props);
    this.state = {
      
    }
  }
  render(){
    return (
      <div>
        <Tabs type="card">
          <TabPane 
            tab="员工管理"
            key="1"
          >
            <Attendance />
          </TabPane>
           <TabPane 
            tab="添加新员工"                
            key="2"
          >
            <AddNewOne />
          </TabPane>
        </Tabs>
      </div>
        
    )
  }
}