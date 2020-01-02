import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore, { IApplicationState } from './models/Store'

interface IProps {
  store: Store<IApplicationState>
}

const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <Routes />
    </Provider>
  )
}

const store = configureStore()
ReactDOM.render(<Root store={store} />, document.getElementById('root'));
