import * as React from 'react';
import { IProduct } from '../models/ProductsData';
import Tabs from './Tabs';
import WithLoader from './WithLoader';

interface IProps {
  product: IProduct | null;
  inBasket: boolean;
  onAdd: () => void;
}

const Product: React.SFC<IProps> = props => {
  if (!props.product) {
    return null;
  }
  const product: IProduct = props.product;
  const handleAddClick = () => {
    props.onAdd();
  }
  return (<React.Fragment>
    <h1>{product.name}</h1>
    <Tabs>
      <Tabs.Tab name='tab1' heading={() => 'test1'} initialActive={true}>
        <p>test1's content</p>
      </Tabs.Tab>
      <Tabs.Tab name='tab2' heading={() => <b>test2</b>}>
        <p>test2's content</p>
      </Tabs.Tab>
    </Tabs>
    <p>{product.description}</p>
    <p>
      {new Intl.NumberFormat("en-US", {
        currency: "USD", 
        style: "currency"
      }).format(product.price)}
    </p>
    {!props.inBasket && (<button onClick={handleAddClick}>Add to basket</button>)}
  </React.Fragment>)
}

export default WithLoader(Product);