import * as React from 'react';
import styles from './index.module.scss';

interface IProps {
  loading: boolean;
}

const withLoader = <P extends object>(
  Component: React.ComponentType<P>
): React.SFC<P & IProps> => ({ loading, ...props }: IProps) => loading ? (
  <div className={styles["loader-overlay"]}>
    <div className={styles["loader-circle-wrap"]}>
      <div className={styles["loader-circle"]} />
    </div>
  </div>
) : (
  <Component {...props as P} />
);

export default withLoader;