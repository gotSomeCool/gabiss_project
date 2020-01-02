import './index.css';

import { Avatar, List, Switch } from 'antd';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import getDate from '../../static/getDate';

export interface ILeave {
  DepartmentId: Number,
  Reason: string,
  StartDate: Date,
  EndDate: Date,
  State: string
}

export interface IState {
  data: ILeave[]
}
let data:ILeave[] = [
  {
    DepartmentId: 12313,
    Reason: '没🐎',
    StartDate: new Date('2019-10-9'),
    EndDate: new Date('2020-7-7'),
    State: 'permit required'
  },{
    DepartmentId: 1231231,
    Reason: '没🐎',
    StartDate: new Date('2019-10-9'),
    EndDate: new Date('2020-7-7'),
    State: 'permit required'
  }
]
export default class LeaveList extends React.Component <{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    Axios.get(`${SERVER_IP}/leave/getAll`).then(res => {
      this.setState({
        data:res.data
      })
    })
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
              avatar={<Avatar src="./static/6.jpg" />}
              title = {item.DepartmentId}
              description = {<h3>{item.Reason}</h3>} />
            <h2 >{getDate(new Date(item.StartDate))} - {getDate(new Date(item.EndDate))}</h2>
          </List.Item>
        )}
      >
        
      </List>
    )
  }
}
