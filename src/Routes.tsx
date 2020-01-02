import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';

import Header from './components/Header';
import Products from './components/Products';
import Product from './components/ProductPage';
import ContactUs from './components/ContactUs';

const Admin = React.lazy(() => import('./components/Admin'))

const Routes: React.SFC<RouteComponentProps> = props => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact={true} path='/products' component={Products} />
        <Route path='/products/:id' component={Product} />
        <Route path='/contactus' component={ContactUs} />
        <Route path='/admin'>
          <React.Suspense fallback={
            <div style={{textAlign: 'center'}}>loading...</div>
          }>
            <Admin />
          </React.Suspense>
        </Route>
      </Switch>
    </div>
  )
}

const RoutesWrap: React.SFC = () => (
  <Router>
    <Route component={Routes} />
  </Router>
)

export default RoutesWrap;