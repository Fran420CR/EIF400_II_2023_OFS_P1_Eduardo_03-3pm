interface ProductProps {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  interface ProductsPageProps {
    products: ProductProps[];
  }
  