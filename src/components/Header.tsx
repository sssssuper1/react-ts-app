import * as React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';
import styles from './index.module.scss';

const Header: React.SFC = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt='logo' className={styles['header-logo']} />
      <h1 className={styles['header-title']}>React Shop</h1>
      <nav>
        <NavLink to='/products' className={styles['header-link']} activeClassName={styles['header-link-active']}>Products</NavLink>
        <NavLink to='/contactus' className={styles['header-link']} activeClassName={styles['header-link-active']}>Contact us</NavLink>
        <NavLink to='/admin' className={styles['header-link']} activeClassName={styles['header-link-active']}>Admin</NavLink>
      </nav>
    </header>
  )
}

export default Header;