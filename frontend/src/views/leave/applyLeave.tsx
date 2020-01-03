import './index.css';

import { Button, Card, DatePicker, Divider, Input, message, Select } from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import Item from 'antd/lib/list/Item';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import { IDepartment } from '../department/department';
import { IEmployee } from '../empManage/EmployeeMange';
import { ILeave } from './leaveList';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
interface IState {
  employee: IEmployee[],
  departments: IDepartment[],
  apply: ILeave,
  selectEmpId: string
}
export default class ApplyLeave extends React.Component <{}, IState>{
  constructor(props: {}) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.applyNewLeave = this.applyNewLeave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.state = {
      employee: [],
      departments: [],
      apply: {
        EmployeeId: '',
        EmployeeName: '',
        DepartmentId: '',
        DepartmentName: '',
        Reason: '',
        StartDate: '',
        EndDate: '',
        State: ''
      },
      selectEmpId:''
    }
  }
  getAll() {
    Axios.get(`${SERVER_IP}/emp/getAll`).then(res => {
      this.setState({
        employee: res.data
      });
    });
    Axios.get(`${SERVER_IP}/department/getAll`).then(res => {
      this.setState({
        departments: res.data
      })
    })
  }
  componentDidMount() {
    this.getAll();
  }
  handleChange(value: string) {
    this.setState({
      selectEmpId: value
    });
  }
  handleDateChange(dates: RangePickerValue, dateStrings: [string,string]) {
    this.setState({
      apply: Object.assign({}, this.state.apply, {StartDate: dateStrings[0], EndDate:dateStrings[1]})
    });
  }
  applyNewLeave() {
    const {
      Reason,
      StartDate,
      EndDate
    } = this.state.apply;
    const selectE = this.state.employee.find(item => item.Id === this.state.selectEmpId);
    const selectD = this.state.departments.find((item) => item.Id === selectE.DepartmentId);
    const EmployeeId = selectE.Id;
    const EmployeeName = selectE.Name;
    const DepartmentId = selectD.Id;
    const DepartmentName = selectD.Name;
    Axios.get(`${SERVER_IP}/leave/addNew`,{params:{
      EmployeeId,
      EmployeeName,
      DepartmentId,
      DepartmentName,
      Reason,
      StartDate, 
      EndDate,
      State:'no permission'
    }}).then( () => {
      message.success('申请成功');
      Bus.emit('leaveUpdate');
    });
  }
  handleReasonChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      apply: Object.assign({},this.state.apply,{Reason:event.target.value})
    });
  }
  render() {
    const Options = this.state.employee.map(item => {
      return <Option value={item.Id} key={item.Id}> {item.Name} </Option>
    })
    return (
      <div>
        <Card title="申请请假" className="add-new-card">
          <Select
            style={{ minWidth:200 }}
            placeholder="选择员工"
            size="large"
            onChange={this.handleChange}
          >
            {Options}
          </Select>
          <Divider type="horizontal" />
          <TextArea 
            placeholder="输入请假理由"
            autoSize={{minRows:2,maxRows:5}}
            onChange={this.handleReasonChange}
          />
          <Divider type="horizontal" />
          <RangePicker 
            onChange={this.handleDateChange}
            size="large"
          />
          <Divider type="horizontal" />
          <Button type="primary" size="large" onClick={this.applyNewLeave}> 申请 </Button>
        </Card>
      </div>
    )
  }
}