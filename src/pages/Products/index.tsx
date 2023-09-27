import React from "react";
import ProductsPage from "../../components/Products"; // Asegúrate de que esta sea la ruta correcta

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "PC escritorio gama baja",
    description: "Core i5, GTX 1060",
    price: 109.99,
  },
  {
    id: 2,
    name: "Celular Xiaomi Mi 12",
    description: "Color Negro",
    price: 309.99,
  },
  // Agrega más productos aquí
];

const ProductsPageWrapper: React.FC = () => {
  return <ProductsPage products={products} />;
};

export default ProductsPageWrapper;
