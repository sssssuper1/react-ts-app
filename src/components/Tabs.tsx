import * as React from 'react';
import styles from './index.module.scss';

interface IState {
  activeName: string;
  activeContent?: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialActive?: true;
  heading: () => string | JSX.Element;
}

interface ITabsContext {
  activeName?: string;
  onTabClick?: (name: string, content: React.ReactNode) => void;
}

const TabsContext = React.createContext<ITabsContext>({})

export default class Tabs extends React.Component<{}, IState> {
  public static Tab: React.SFC<ITabProps> = props => {
    return (
      <TabsContext.Consumer>
        {(context: ITabsContext) => {
          if (!context.activeName && props.initialActive) {
            if (context.onTabClick) {
              context.onTabClick(props.name, props.children)
              // return null
            }
          }
          const activeName = context.activeName
          const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
            if (context.onTabClick) {
              context.onTabClick(props.name, props.children)
            }
          }

          return <li className={activeName === props.name ? styles.active : ""}
          onClick={handleClick}>{props.heading()}</li>
        }}
      </TabsContext.Consumer>
    )
  }

  private didMount: boolean = false
  private catchState: IState | null = null

  public componentDidMount() {
    this.didMount = true
    if (this.catchState !== null) {
      this.setState(this.catchState)
    }
  }

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state && this.state.activeName,
          onTabClick: this.onTabClick
        }}
      >
        <ul className={styles.tabs}>{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }

  private onTabClick = (name: string, content: React.ReactNode) => {
    const state = {activeName: name, activeContent: content}
    if (this.didMount) {
      this.setState(state)
    } else {
      this.catchState = state
    }
  }
}