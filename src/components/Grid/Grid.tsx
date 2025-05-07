import { Product } from "../../types/product";
import Card from "../Card/Card";
import styles from "./Grid.module.scss";

interface GridProps {
  products: Product[];
}

export default function Grid({ products }: GridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
