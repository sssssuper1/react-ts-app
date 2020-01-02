const wait = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const products: IProduct[] = [
  {
    description: "A collection of navigational components that compose declaratively with your app",
    id: 1,
    name: "React Router",
    price: 8
  },{
    description: "A library that helps manage state across your app",
    id: 2,
    name: "React Redux",
    price: 12
  },{
    description: "A library that helps you interact with a GraphQL backend",
    id: 3,
    name: "React Apollo",
    price: 12
  }
]

export const getProductById = async (id: number): Promise<IProduct | null> => {
  await wait(1000)
  const foundProducts = products.filter(p => p.id === id)
  return foundProducts.length > 0 ? foundProducts[0] : null
}

export const getProducts = async (): Promise<IProduct[]> => {
  await wait(1000)
  return products
}