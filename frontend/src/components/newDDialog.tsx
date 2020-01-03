import { Button, Card, Divider, Input, InputNumber, message, Modal, Select } from 'antd';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../static/const';
import { IDepartment } from '../views/department/department';

const {Option} = Select;

interface IState {
  visible: boolean,
  newDepartment: IDepartment,
  time:number[]
}
interface IProps {
  title: string;
  getData(): void;
}
export default class Dialog extends React.Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.show = this.show.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      visible: false,
      newDepartment: {
        Name: '',
        WorkingHoursAM: '',
        WorkingHoursPM: ''
      },
      time:[0,0,0,0]
    }
  }
  onOk() {
    const {
      Name
    } = this.state.newDepartment;
    const time = this.state.time;
    if(Name === '' || ( time[0] + time[1] + time[2] + time[3] === 0)) return;
    Axios.get(`${SERVER_IP}/department/addNew`,{params: {
      Name,
      WorkingHoursAM : `${time[0]}:${time[1]}`,
      WorkingHoursPM : `${time[2]}:${time[3]}`
    }}).then(() => {
      this.props.getData();
      message.success('添加部门成功');
      this.setState({
        visible: false,
      });
    }).catch(() => {
      message.error('添加部门失败');
    });
  }
  show(){
    this.setState({
      visible: !this.state.visible
    })
  }
  onCancel() {
    this.show();
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>){
    this.setState({
      newDepartment: Object.assign({},this.state.newDepartment,{Name: event.target.value})
    })
  }
  handleNumberChange(index: number,value: number) {
    let newTime = Object.assign([],this.state.time);
    newTime[index] = value;
    this.setState({
      time:newTime
    })
  }
  render() {
    return (
        <Modal
          ref="addNewEDialog"
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          width="35vw"
          okText="确认添加"
          cancelText="取消"
        >
          <div style={{width:'30vw'}}>
            <Input size="large" placeholder="部门名称" onChange={this.handleChange} />
            <Divider type="horizontal" />
            <span> 上班时间 :</span> 
            <InputNumber 
              max={24}
              min={0}
              placeholder="请输入"
              onChange={value => this.handleNumberChange(0, value)}
            /> : <InputNumber 
              max={60}
              min={0}
              placeholder="上班时间"
              onChange={value => this.handleNumberChange(1, value)}
            /> 
            <Divider type="horizontal" />
            <span> 下班时间 :</span> 
            <InputNumber 
              max={24}
              min={0}
              placeholder="请输入"
              onChange={value => this.handleNumberChange(2, value)}
            /> : <InputNumber 
              max={60}
              min={0}
              placeholder="下班时间"
              onChange={value => this.handleNumberChange(3, value)}
            />
          </div>
        </Modal>
    )
  }
}