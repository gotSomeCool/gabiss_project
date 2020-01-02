import { Button, Card, Divider, Input, Modal, Select } from 'antd';
import * as React from 'react';

import { IDepartment } from '../views/department/department';

const {Option} = Select;

interface IState {
  visible: boolean,
  newDepartment: IDepartment
}
interface IProps {
  title: string;
}
export default class Dialog extends React.Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      newDepartment: {
        Id: 0,
        Name: '',
        WorkingHoursAM: '',
        WorkingHoursPM: ''
      }
    }
  }
  onOk() {

  }
  onCancel() {

  }
  handleChange() {
    
  }
  render() {
    return (
        <Modal
          ref="addNewEDialog"
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          <Card title="添加新员工" style={{width:'30vw'}}>
            <Input size="large" placeholder="员工姓名" onChange={this.handleChange}/>
            <Divider type="horizontal" />
            <Select 
              style={{width: 200}}
              placeholder="选择性别"
            >
              <Option value="男"> 男 </Option>
              <Option value="女"> 女 </Option>
            </Select>
            <Divider type="horizontal" />
            <Button type="primary">添加</Button>
          </Card>
          
        </Modal>
    )
  }
}