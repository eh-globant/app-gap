import { formatPrice } from "./formatters";

describe("formatPrice with Intl mock", () => {
  const mockFormat = jest.fn();
  const originalIntl = Intl;

  beforeEach(() => {
    (globalThis as any).Intl = {
      NumberFormat: jest.fn(() => ({
        format: mockFormat,
      })),
    } as any;
  });

  afterEach(() => {
    (globalThis as any).Intl = originalIntl;
    jest.clearAllMocks();
  });

  it("handles null values", () => {
    mockFormat.mockReturnValue("$0.00");
    expect(formatPrice(null)).toBe("$0.00");
    expect(Intl.NumberFormat).toHaveBeenCalledWith("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  it("formats numbers correctly", () => {
    mockFormat.mockReturnValue("$1,234.56");
    expect(formatPrice(1234.56)).toBe("$1,234.56");
  });
});
