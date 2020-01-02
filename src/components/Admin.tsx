import * as React from 'react';
import styles from './index.module.scss';
import { NavLink, Route, RouteComponentProps } from 'react-router-dom';

interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

const adminUsersData: IUser[] = [
  { id: 1, name: "Fred", isAdmin: true },
  { id: 2, name: "Bob", isAdmin: false },
  { id: 3, name: "Jane", isAdmin: true } 
];

const AdminPage: React.SFC = () => (
  <div className={styles["page-container"]}>
    <h1>Admin Panel</h1>
    <ul className={styles["admin-sections"]}>
      <li key="users">
        <NavLink to={`/admin/users`} activeClassName={styles["admin-link-active"]}>Users</NavLink>
      </li>
      <li key="products">
        <NavLink to={`/admin/products`} activeClassName={styles["admin-link-active"]}>Products</NavLink>
      </li>
    </ul>
    <Route path="/admin/users" component={AdminUsers} />
    <Route path="/admin/products" component={AdminProducts} />
    <Route path="/admin/users/:id" component={AdminUser} />
  </div>
);

const AdminUsers: React.SFC = () => (
  <div>
    <ul className={styles["admin-sections"]}>
      {adminUsersData.map(user => (
        <li key={user.id}>
          <NavLink to={`/admin/users/${user.id}`} activeClassName={styles["admin-link-active"]}>{user.name}</NavLink>
        </li>
      ))}
    </ul>
  </div>
)

const AdminUser: React.SFC<RouteComponentProps<{id: string}>> = props => {
  let user: IUser;
  if (props.match.params.id) {
    const id: number = parseInt(props.match.params.id, 10);
    user = adminUsersData.filter(v => v.id === id)[0]
  } else {
    return null;
  }

  return (
    <div>
      <div>
        <b>Id: </b>
        <span>{user.id.toString()}</span>
      </div>
      <div>
        <b>Is Admin: </b>
        <span>{user.isAdmin.toString()}</span>
      </div>
    </div>
  );   
}

const AdminProducts: React.SFC = () => (
  <div>admin products</div>
)

export default AdminPage