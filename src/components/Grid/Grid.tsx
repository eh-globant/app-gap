import { useState, useEffect } from "react";

import Card from "../Card/Card";
import { Product } from "../../types/product";

import styles from "./Grid.module.scss";

interface GridProps {
  products: Product[];
}

export default function Grid({ products }: GridProps) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const productsPerPage = 8;

  const loadMore = () => {
    const nextProducts = products.slice(0, page * productsPerPage);
    setVisibleProducts(nextProducts);
  };

  useEffect(() => {
    loadMore(); // Load first products at start
  }, []);

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid"]}>
        {visibleProducts.map((product, id) => (
          <Card key={id} product={product} />
        ))}
      </div>
    </div>
  );
}
