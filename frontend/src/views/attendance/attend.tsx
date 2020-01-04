import { Button, Calendar, Card, message, Select } from 'antd';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import getDate from '../../static/getDate';
import { IDepartment } from '../department/department';
import { IEmployee } from '../empManage/EmployeeMange';

const {Option} = Select;
export interface IAttend {
  EmployeeId: string,
  EmployeeName: string,
  DepartmentId: string,
  AttendDate: string,
  State:string
}
interface IState {
  employee: IEmployee[],
  department: IDepartment[],
  selectId: string
}
function compareTime(date1: Date,date2: Date):boolean{
  const first = date1.getHours()*3600 + date1.getMinutes()*60 + date1.getSeconds();
  const second = date2.getHours()*3600 + date2.getMinutes()*60 + date2.getSeconds();
  return first > second
}
export default class Attend extends React.Component <{}, IState>{
  constructor(props: {}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addNewAttend = this.addNewAttend.bind(this);
    this.state = {
      employee: [],
      department: [],
      selectId: ''
    }
  }
  addNewAttend() {
    const emp = this.state.employee.find(item => item.Id === this.state.selectId);
    const dep = this.state.department.find(item => item.Id === emp.DepartmentId);
    const state = compareTime(new Date(), new Date(dep.WorkingHoursAM));
    Axios.get(`${SERVER_IP}/attendance/addNew`,{params:{
      EmployeeId: emp.Id,
      EmployeeName:emp.Name,
      DepartmentId:dep.Id,
      AttendDate: new Date(),
      State: state ? 'onTime': 'late'
    }}).then(() => {
      Bus.emit('attendUpdate');
      if(state) {
        message.success('准时打卡👍');
      }else {
        message.warn('上班迟到🌶')
      }
    });
  }
  handleChange(value: string) {
    this.setState({
      selectId: value
    });
  }
  componentDidMount() {
    Axios.get(`${SERVER_IP}/emp/getAll`).then(res => {
      this.setState({
        employee: res.data
      });
    });
    Axios.get(`${SERVER_IP}/department/getAll`).then(res => {
      this.setState({
        department: res.data
      });
    });
  }
  render() {
    const Options = this.state.employee.map(item => {
      return <Option value={item.Id} key={item.Id}>{item.Name}</Option>
    });
    return (
      <div className="attend-box">
        <span className="attend-title">今天是 {getDate(new Date())}</span>
        <div style={{ width: '30%', border: '1px solid #d9d9d9', borderRadius: 4 ,marginBottom: 30}}>
          <Calendar fullscreen={false} />
        </div>
        <Select
          style={{width: '30%'}}
          placeholder="选择员工"
          onChange={this.handleChange}
          size="large"
          showSearch
          filterOption={(input,option) => 
            option.props.children.toString().toLowerCase().indexOf(input.toLowerCase())>=0
          }
        >
          {Options}
        </Select>
        <Button type="primary" size="large" style={{width: '30%',marginTop: 30}} onClick={this.addNewAttend}> 打卡 </Button>
      </div>
    )
  }
}