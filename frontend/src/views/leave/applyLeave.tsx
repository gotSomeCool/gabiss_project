import { Card, DatePicker, Divider, Input, Select } from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import Item from 'antd/lib/list/Item';
import Axios from 'axios';
import * as React from 'react';

import { SERVER_IP } from '../../static/const';
import { IEmployee } from '../empManage/EmployeeMange';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
interface IState {
  employee: IEmployee[]
}

export default class ApplyLeave extends React.Component <{}, IState>{
  constructor(props: {}) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.state={
      employee: []
    }
  }
  componentDidMount() {
    Axios.get(`${SERVER_IP}/emp/getAll`).then(res => {
      this.setState({
        employee:res.data
      });
    });
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement>) {

  }
  handleDateChange(dates: RangePickerValue, dateStrings: [string,string]) {
    console.log(dates,dateStrings);
  }
  render() {
    const Options = this.state.employee.map(item => {
      return <Option value={item.Id} key={item.Id}> {item.Name} </Option>
    })
    return (
      <div>
        <Card title="申请请假" style={{width:'30%'}}>
          <Select
            style={{ minWidth:200 }}
            placeholder="选择员工"
            size="large"
          >
            {Options}
          </Select>
          <Divider type="horizontal" />
          <TextArea 
            placeholder="输入请假理由"
            autoSize={{minRows:2,maxRows:5}}
          />
          <Divider type="horizontal" />
          <RangePicker 
            onChange={this.handleDateChange}
            size="large"
          />
        </Card>
      </div>
    )
  }
}