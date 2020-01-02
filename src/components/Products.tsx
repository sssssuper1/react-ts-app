import * as React from 'react';
import { IProduct, products } from '../models/ProductsData';
import styles from './index.module.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux'
import { IApplicationState } from '../models/Store'
import { getProducts } from '../models/ProductsActions'

interface IProps extends RouteComponentProps {
  products: IProduct[]
  loading: boolean
  getProducts: typeof getProducts
}

class Products extends React.Component<IProps> {
  // public static getDerivedStateFromProps(props: RouteComponentProps, state: IState): IState {
  //   const searchParams = new URLSearchParams(props.location.search);
  //   const search = searchParams.get('search') || '';
  //   return {
  //     products: state.products,
  //     search
  //   }
  // }

  public async componentDidMount() {
    this.props.getProducts()
  }

  public render() {
    const searchParams = new URLSearchParams(this.props.location.search)
    const search = searchParams.get('search') || '';
    return (
      <div className={styles["page-container"]}>
        <p>Welcome to React Shop where you can get all your tools for ReactJS!</p>
        <ul className={styles["product-list"]}>
          {this.props.products.map(product => (
            <li key={product.id} className={styles["product-list-item"]}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    loading: state.products.productsLoading,
    products: state.products.products
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)