export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  
  export type ProductsPageProps = {
    products: Product[];
  };
  