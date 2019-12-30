import * as React from 'react';

import {Attendance} from './EmployeeMange';
import {AddNewOne} from './addNewEmployee';
import {Tabs, Icon} from 'antd';
const {TabPane} = Tabs;

import '../style/empMange.css';

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
      <div className="main">
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="apple" />
                员工
              </span>
            }
            key="1"
          >
            <Attendance />
          </TabPane>
           <TabPane
            tab={
              <span>
                <Icon type="android" />
                添加新员工
              </span>
            }
            key="2"
          >
            <AddNewOne />
          </TabPane>
        </Tabs>
      </div>
        
    )
  }
}