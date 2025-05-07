// Mocked products
import image from "../assets/images/products/product1.jpg";
import { Product } from "../types/product";

const allProducts: Product[] = Array.from({ length: 32 }, (_, i) => ({
  id: `x${i + 1}`,
  name: `Shirt ${i + 1}`,
  image: image,
  description: `Producto ${i + 1}`,
  cost: 500,
  discount: 420,
}));

export default allProducts;
