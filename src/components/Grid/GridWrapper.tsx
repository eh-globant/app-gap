import { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import { Product } from "../../types/product";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import allProducts from "../../data/products";
import styles from "./Grid.module.scss";

interface GridProps {
  productsPerPage?: number;
}

export default function GridWrapper({ productsPerPage = 8 }: GridProps) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Load more products
  const loadMoreProducts = useCallback(async () => {
    if (isLoading || visibleProducts.length >= allProducts.length) return;

    setIsLoading(true);

    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Calculate indexes
    const startIndex = page * productsPerPage;
    const endIndex = (page + 1) * productsPerPage;
    const nextProducts = allProducts.slice(startIndex, endIndex);

    // Add new products
    setVisibleProducts((prev) => [...prev, ...nextProducts]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  }, [page, isLoading, productsPerPage]);

  // Initial load
  useEffect(() => {
    // Load the first products at start (8 by default)
    const initialProducts = allProducts.slice(0, productsPerPage);
    setVisibleProducts(initialProducts);
    setPage(1);
  }, [productsPerPage]);

  const targetRef = useInfiniteScroll(
    loadMoreProducts,
    visibleProducts.length < allProducts.length,
    isLoading
  );

  return (
    <>
      <div className={styles["grid__wrapper"]} data-testid="grid-wrapper">
        <Grid products={visibleProducts} />
      </div>
      <div ref={targetRef} className={styles["grid__scroll-trigger"]}>
        {isLoading && (
          <div className={styles["grid__loading-spinner"]}>Loading...</div>
        )}
      </div>
    </>
  );
}
