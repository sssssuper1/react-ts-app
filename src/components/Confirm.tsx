import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface IProps {
  show: boolean;
  title?: string;
  content: string;
}

interface IState {
  action: number;
}

export default class Confirm extends Component<IProps, IState> {
  public static defaultProps = {
    title: 'confirm'
  }
  public render() {
    return (
      <div className={classnames({[styles["confirm-wrapper"]]: true, [styles["confirm-visible"]]: this.props.show})}>
        <div className={styles["confirm-container"]}>
          <div className={styles["confirm-title-container"]}>
            <span>{this.props.title}</span>
          </div>
          <div className={styles["confirm-content-container"]}>
            <p>{this.props.content}</p>
          </div>
          <div className={styles["confirm-buttons-container"]}>
            <button className={styles["confirm-cancel"]}>Cancel</button>
            <button className={styles["confirm-ok"]} onClick={this.onOkClick}>Okay</button>
          </div>
        </div>
      </div>
    )
  }

  private onOkClick = () => {
    console.log('OK')
  }
}