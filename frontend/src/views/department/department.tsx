import * as React from 'react';

import {Icon, Card, Avatar} from 'antd';
const {Meta} = Card;

import '../style/departManage.css';

export interface IDepartmentProps {
  name: string,
  description: string,
  avatarSrc?: string
}

const actionsMenu = [
  
]

export default class Department extends React.Component<IDepartmentProps,{}> {
  
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