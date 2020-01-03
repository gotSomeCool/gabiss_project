import '../style/departManage.css';

import { Avatar, Card, Icon, message } from 'antd';
import Axios from 'axios';
import * as React from 'react';

import { IMAGES, SERVER_IP } from '../../static/const';
import Bus from '../../static/eventBus';
import getDate from '../../static/getDate';

const {Meta} = Card;

export interface  IDepartment {
  Id?: string,
  Name: string,
  WorkingHoursAM: string,
  WorkingHoursPM: string,

  showDialog ?(event: React.MouseEvent, id? : string): void
  width?: string
}
function getTime(date: Date) {
  const H = date.getHours();
  const M = date.getMinutes();
  return `${H}:${M}`
}

export default class Department extends React.Component<IDepartment,{}> {
  constructor(props: IDepartment) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(id: string) {
    Axios.get(`${SERVER_IP}/department/remove`, {params: {
      id
    }}).then(() => {
      message.success('删除成功');
    });
    Bus.emit('departmentUpdate');
  }
  render(){
    const width = this.props.width ? this.props.width : "300px";
    return (
      <Card
        className="flex-item"
        style={{width}}
        cover={
          <img 
          alt="背景图片"
          src={IMAGES[Number(this.props.Id) % IMAGES.length]}/>
        }
        actions={[
          <Icon type="delete" key="delete" onClick={()=>this.handleDelete(this.props.Id)} />,
          <Icon type="ellipsis" key="ellipsis" onClick={(event) => {if(this.props.showDialog) this.props.showDialog(event,this.props.Id)}} />
        ]}
        hoverable={true}
      >
        <Meta 
           avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
           title={this.props.Name}
           description={`上班时间: ${getTime(new Date(this.props.WorkingHoursAM))}, 下班时间: ${getTime(new Date(this.props.WorkingHoursPM))}`}
        /> 
      </Card>
    )
  }
} 