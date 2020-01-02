import '../style/departManage.css';

import { Avatar, Card, Icon } from 'antd';
import * as React from 'react';

const {Meta} = Card;

export interface IProps {
  name: string,
  description: string,
  avatarSrc?: string
}

export interface  IDepartment {
  Id: number,
  Name: string,
  WorkingHoursAM: Date,
  WorkingHoursPm: Date
}

export default class Department extends React.Component<IProps,{}> {
  
  render(){
    return (
      <Card
        className="flex-item"
        style={{width: 300}}
        cover={
          <img 
          alt="example"
          src={this.props.avatarSrc}/>
        }
        actions={[
          <Icon type="setting" key="setting" />,
          <Icon type="edit" key="edit" />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        hoverable={true}
      >
        <Meta 
           avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
           title={this.props.name}
           description={this.props.description}
        /> 
      </Card>
    )
  }
} 