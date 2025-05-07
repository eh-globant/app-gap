import { useState, useEffect, useCallback } from "react";
import Card from "../Card/Card";

import { Product } from "../../types/product";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import allProducts from "../../data/products";

import styles from "./Grid.module.scss";

export default function Grid() {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 8;

  const loadMoreProducts = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);

    // Simulates loading time
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = 0;
      const endIndex = nextPage * productsPerPage;
      const nextProducts = allProducts.slice(startIndex, endIndex);

      setVisibleProducts(nextProducts);
      setPage(nextPage);
      setIsLoading(false);
    }, 500);
  }, [page, isLoading]);

  // Initial loading
  useEffect(() => {
    loadMoreProducts();
  }, []);

  const targetRef = useInfiniteScroll(
    loadMoreProducts,
    visibleProducts.length < allProducts.length,
    isLoading
  );

  return (
    <div className={styles["grid-container"]}>
      <div className={styles["grid"]}>
        {visibleProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {/* Loading time and scroll triggering */}
      <div ref={targetRef} className={styles["scroll-trigger"]}>
        {isLoading && (
          <div className={styles["loading-spinner"]}>Loading...</div>
        )}
      </div>

      {/* If there are no more products */}
      {!isLoading && visibleProducts.length >= allProducts.length && (
        <div className={styles["no-more-products"]}>
          There are no more products to show
        </div>
      )}
    </div>
  );
}
