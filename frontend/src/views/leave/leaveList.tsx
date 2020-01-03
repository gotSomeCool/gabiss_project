import './index.css';

import { Avatar, List, Switch } from 'antd';
import Axios from 'axios';
import { EventEmitter } from 'events';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import getDate from '../../static/getDate';
import { IEmployee } from '../empManage/EmployeeMange';

export interface ILeave {
  EmployeeId: string,
  EmployeeName: string,
  DepartmentId: string,
  DepartmentName: string,
  Reason: string,
  StartDate: string,
  EndDate: string,
  State: string
}
export interface IState {
  data: ILeave[],
  employee: IEmployee[]
}
export default class LeaveList extends React.Component <{}, IState> {
  private eventBus: EventEmitter;
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      employee: []
    };
  }
  getAll() {
    Axios.get(`${SERVER_IP}/leave/getAll`).then(res => {
      this.setState({
        data: res.data
      });
    });
    Axios.get(`${SERVER_IP}/emp/getAll`).then(res => {
      this.setState({
        employee: res.data
      });
    });
  }
  componentDidMount() {
    this.getAll();
    this.eventBus = Bus.addListener('leaveUpdate',() => {
      this.getAll();
    });
  }
  componentWillUnmount() {
    this.eventBus.removeAllListeners();
  }
  render() {
    return (
      <List
        itemLayout="vertical"
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item
          extra={
            <div className="extra-content">
              <Switch 
                checkedChildren="批准"
                unCheckedChildren="未批准"
              />
            </div>
            }
          >
            <List.Item.Meta
              avatar={<Avatar className="avatar-pic" >{item.EmployeeName}</Avatar>}
              title = {`姓名 : ${item.EmployeeName} , 部门 : ${item.DepartmentName}`}
              description = {<div><h3>{getDate(new Date(item.StartDate))} - {getDate(new Date(item.EndDate))}</h3>,<h2>请假原因:{item.Reason}</h2></div>}/>
          </List.Item>
        )}
      >
        
      </List>
    )
  }
}
