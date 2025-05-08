import { render, waitFor, act } from "@testing-library/react";
import GridWrapper from "./GridWrapper";
import "@testing-library/jest-dom";

// Type for mock of IntersectionObserver
interface MockIntersectionObserver {
  new (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): {
    observe: jest.Mock;
    unobserve: jest.Mock;
    disconnect: jest.Mock;
  };
}

// Mock products
jest.mock("../../data/products", () => ({
  __esModule: true,
  default: Array.from({ length: 32 }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: `Product ${i + 1}`,
    image: `image-${i + 1}.jpg`,
    description: `Description ${i + 1}`,
    cost: 100 * (i + 1),
    discount: 80 * (i + 1),
  })),
}));

describe("GridWrapper Component", () => {
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;
  let observerCallback: IntersectionObserverCallback;
  let observerInstance: any;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Initialize mocks
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    // Configurare IntersectionObserver mock
    class MockIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
        observerInstance = this;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
    }

    // Asign mock
    (window as any).IntersectionObserver = MockIntersectionObserver;
  });

  // Helper to simulate scroll
  const simulateScroll = async () => {
    await act(async () => {
      const entry: IntersectionObserverEntry = {
        isIntersecting: true,
        intersectionRatio: 1,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: document.createElement("div"),
        time: 0,
      };
      observerCallback([entry], observerInstance);
    });
  };

  it("renders without crashing", () => {
    const { getByTestId } = render(<GridWrapper />);
    expect(getByTestId("grid-wrapper")).toBeInTheDocument();
  });

  it("loads initial 8 products", async () => {
    const { getAllByRole } = render(<GridWrapper />);

    await waitFor(() => {
      expect(getAllByRole("img")).toHaveLength(8);
    });
  });

  it("shows loading indicator when fetching more products", async () => {
    const { getByText, queryByText } = render(<GridWrapper />);

    await simulateScroll();
    expect(getByText("Loading...")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(queryByText("Loading...")).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("loads additional 8 products when scrolled", async () => {
    const { getAllByRole } = render(<GridWrapper />);

    // Verify initial load
    await waitFor(() => {
      expect(getAllByRole("img")).toHaveLength(8);
    });

    // Simulate scroll
    await simulateScroll();

    // Verify additional load
    await waitFor(
      () => {
        expect(getAllByRole("img")).toHaveLength(16);
      },
      { timeout: 2000 }
    );
  });

  it("matches snapshot", async () => {
    const { asFragment, getAllByRole } = render(<GridWrapper />);

    await waitFor(() => {
      expect(getAllByRole("img")).toHaveLength(8);
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
