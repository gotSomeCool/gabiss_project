import { Button, Modal } from 'antd';
import * as React from 'react';

interface IState {
  visible: boolean
}
interface IProps {
  title: string;
  onOk(): void;
  onCancel(): void;
  content: React.ReactNode
}
export default class Dialog extends React.Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false
    }
  }
  render() {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
        >
          {this.props.content}
        </Modal>
      </div>
    )
  }
}