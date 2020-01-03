import '../style/departManage.css';

import { Button, Modal } from 'antd';
import Axios from 'axios';
import { EventEmitter } from 'events';
import * as React from 'react';

import NewDialog from '../../components/newDDialog';
import { SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import Department, { IDepartment } from './department';

interface IState {
  departments:IDepartment[],
  dialogVisible: boolean,
  showDepartment ?: React.ReactNode
}

export default class departmentManage extends React.Component <{}, IState>  {
  dialogRef: React.RefObject<NewDialog>;
  eventBus : EventEmitter;
  constructor(props: {}) {
    super(props);
    this.dialogRef = React.createRef();
    this.showDialog = this.showDialog.bind(this);
    this.showDepartmentDialog = this.showDepartmentDialog.bind(this);
    this.eventBus = Bus.addListener('departmentUpdate',() => {
      this.getAll();
    });
    this.state={
      departments: [],
      dialogVisible: false
    };
  }
  showDialog() {
    this.dialogRef.current.show();
  }
  getAll() {
    Axios.get(`${SERVER_IP}/department/getAll`).then(res => {
      this.setState({
        departments: res.data
      });
    });
  }
  componentDidMount() {
   this.getAll();
  }
  componentWillUnmount() {
    this.eventBus.removeAllListeners(); 
  }
  showDepartmentDialog(event: React.MouseEvent, id: string = '') {
    const showDepartment = this.state.departments.find(item => item.Id === id);
    if(showDepartment) {
      this.setState({
        showDepartment:(
          <Department 
            Id={showDepartment.Id}
            Name={showDepartment.Name}
            WorkingHoursAM={showDepartment.WorkingHoursAM}
            WorkingHoursPM={showDepartment.WorkingHoursPM}
          />
        )
      })
    }
    this.setState({
      dialogVisible:!this.state.dialogVisible
    });
  }
  render() {
    const departments = this.state.departments.map(item => {
      return (       
        <Department 
        Id={item.Id} 
        Name={item.Name} 
        WorkingHoursAM={item.WorkingHoursAM}
        WorkingHoursPM={item.WorkingHoursPM} 
        key={item.Id}
        showDialog={this.showDepartmentDialog}
        width="500px"
        />
      );
    })
    return (
      <>
        <NewDialog ref={this.dialogRef} title="添加新部门" getData={this.getAll.bind(this)}/>
        <Modal
          title="部门详情"
          visible={this.state.dialogVisible}
          onOk={this.showDepartmentDialog}
          onCancel={this.showDepartmentDialog}
          okText="确认"
          cancelText="取消"
        >
          <div className="department-dialog-body">
              {this.state.showDepartment}
          </div>
        </Modal>
        <div className="flex-box">
          {departments}
          <div className="department-manage">
            <Button type="danger" size="large" className="department-manage-button" onClick={this.showDialog}> 新建部门 </Button>
          </div>
        </div>
      </>
      
    )
  }
}