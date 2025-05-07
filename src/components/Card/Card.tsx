import { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatters";

import styles from "./Card.module.scss";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div className={styles["card__container"]}>
      <div className={styles["card__image-container"]}>
        <img
          className={styles["card__image"]}
          src={product.image}
          alt={product.name}
        ></img>
      </div>
      <div className={styles["card__info-container"]}>
        <p className={styles["card__info-description"]}>
          {product.description}
        </p>
        <p className={styles["card__info-cost"]}>
          {formatPrice(product.cost, "MXN")}
        </p>
        <p className={styles["card__info-discount"]}>
          {formatPrice(product.discount, "MXN")}
        </p>
      </div>
    </div>
  );
}
