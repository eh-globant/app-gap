import { render } from "@testing-library/react";
import Card from "./Card";
import { Product } from "../../types/product";
import { formatPrice } from "../../utils/formatters";

describe("Card Component", () => {
  const mockProduct: Product = {
    id: "1",
    name: "Test Product",
    image: "test-image.jpg",
    description: "Test Description",
    cost: 600,
    discount: 500,
  };

  it("renders product information correctly", () => {
    const { getByAltText, getByText } = render(<Card product={mockProduct} />);

    // Verify image attributes
    const image = getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);

    // Verify description
    expect(getByText(mockProduct.description)).toBeInTheDocument();

    // Verify prices
    const formattedCost = formatPrice(mockProduct.cost, "MXN");
    const formattedDiscount = formatPrice(mockProduct.discount, "MXN");
    expect(getByText(formattedCost)).toBeInTheDocument();
    expect(getByText(formattedDiscount)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container, getByAltText } = render(<Card product={mockProduct} />);

    // Verify main classes
    expect(container.firstChild).toHaveClass("card__container");
    expect(getByAltText(mockProduct.name)).toHaveClass("card__image");
  });
});
