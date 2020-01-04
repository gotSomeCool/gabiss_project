import './index.css';

import { Avatar, Button, DatePicker, List, Switch } from 'antd';
import Axios from 'axios';
import { EventEmitter } from 'events';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import getDate from '../../static/getDate';
import { IAttend } from './attend';

const {RangePicker} = DatePicker;
export interface IState {
  data: IAttend[]
}
export default class LeaveList extends React.Component <{}, IState> {
  private eventBus: EventEmitter;
  constructor(props: {}) {
    super(props);
    this.state = {
      data: []
    };
  }
  getAll() {
    Axios.get(`${SERVER_IP}/attendance/getAll`).then(res => {
      this.setState({
        data: res.data
      });
    });
  }
  componentDidMount() {
    this.getAll();
    this.eventBus = Bus.addListener('attendUpdate',() => {
      this.getAll();
    });
  }
  componentWillUnmount() {
    this.eventBus.removeAllListeners();
  }
  render() {
    return (
      <div style={{width:'80%',margin:'5 auto'}}>
        <RangePicker />
            <List
                itemLayout="vertical"
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item
                  extra={
                    <div className="extra-content">
                      {item.State==='onTime'?<Button type="primary">准时</Button>:
                        <Button type="danger">迟到</Button>
                      }
                    </div>
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar className="avatar-pic" >{item.EmployeeName}</Avatar>}
                      title = {`姓名 : ${item.EmployeeName}`}
                      description = {<div><h3>{getDate(new Date(item.AttendDate),true)}</h3>,<h2>打卡状态 : {item.State === 'onTime' ? '准时': '迟到'}</h2></div>}/>
                  </List.Item>
                )}
              >
                
            </List>
      </div>
      
    )
  }
}
