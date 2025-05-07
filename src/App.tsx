import Grid from "./components/Grid/Grid";
import { Product } from "./types/product";
import image from "./assets/images/products/product1.jpg";

export default function App() {
  const products: Product[] = [
    {
      id: "x1",
      name: "shirt",
      image: image,
      description: "Producto 1",
      cost: 500,
      discount: 420,
    },
    {
      id: "x2",
      name: "shirt",
      image: image,
      description: "Producto 2",
      cost: 500,
      discount: 420,
    },
    {
      id: "x3",
      name: "shirt",
      image: image,
      description: "Producto 3",
      cost: 500,
      discount: 420,
    },
    {
      id: "x4",
      name: "shirt",
      image: image,
      description: "Producto 4",
      cost: 500,
      discount: 420,
    },
    {
      id: "x5",
      name: "shirt",
      image: image,
      description: "Producto 5",
      cost: 500,
      discount: 420,
    },
    {
      id: "x6",
      name: "shirt",
      image: image,
      description: "Producto 6",
      cost: 500,
      discount: 420,
    },
    {
      id: "x7",
      name: "shirt",
      image: image,
      description: "Producto 7",
      cost: 500,
      discount: 420,
    },
    {
      id: "x8",
      name: "shirt",
      image: image,
      description: "Producto 8",
      cost: 500,
      discount: 420,
    },
  ];

  console.log("fromApp", products);
  return <Grid></Grid>;
}
