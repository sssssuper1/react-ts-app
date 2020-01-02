import * as React from 'react';
import { IProduct, getProductById } from '../models/ProductsData';
import { RouteComponentProps } from 'react-router-dom';
import styles from './index.module.scss';

import Product from './Pruduct';

type Props = RouteComponentProps<{id: string}>

interface IState {
  product: IProduct | null;
  added: boolean;
  loading: boolean;
}

export default class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
      loading: true,
      product: null
    }
  }

  public async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      const product = await getProductById(id)
      this.setState({ product, loading: false });
    }
  }

  public render() {
    const { product, added, loading } = this.state;
    return (
      <div className={styles["page-container"]}>
        {product || loading ? <Product
          loading={loading}
          product={product}
          inBasket={added}
          onAdd={this.handleAddClick}
         /> : <p>Product not found!</p>}
      </div>
    );
  }
   
  private handleAddClick = () => {
    this.setState({ added: true });
  }
}