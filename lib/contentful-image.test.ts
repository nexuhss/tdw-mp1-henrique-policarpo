import { contentfulLoader } from "./contentful-image";

describe("Contentful Image Loader", () => {
  it("should generate correct WebP URLs with valid parameters", () => {
    const testSrc = "https://images.ctfassets.net/space/test-image.jpg";
    const result = contentfulLoader({ src: testSrc, width: 800, quality: 75 });

    expect(result).toBe(
      "https://images.ctfassets.net/space/test-image.jpg?w=800&q=75&fm=webp"
    );
  });

  it("should include WebP format parameter", () => {
    const testSrc = "https://images.ctfassets.net/space/test-image.jpg";
    const result = contentfulLoader({ src: testSrc, width: 800, quality: 75 });

    expect(result).toContain("fm=webp");
    expect(result).toContain("w=800");
    expect(result).toContain("q=75");
  });

  it("should NOT include unsupported fl=progressive parameter", () => {
    const testSrc = "https://images.ctfassets.net/space/test-image.jpg";
    const result = contentfulLoader({ src: testSrc, width: 800, quality: 75 });

    // CRITICAL: fl=progressive is NOT supported with WebP format
    expect(result).not.toContain("fl=progressive");
    expect(result).not.toContain("fl=");
  });

  it("should use default width and quality when not provided", () => {
    const testSrc = "https://images.ctfassets.net/space/test-image.jpg";
    const result = contentfulLoader({ src: testSrc });

    expect(result).toContain("w=1920");
    expect(result).toContain("q=75");
  });

  it("should preserve original URL structure", () => {
    const testSrc =
      "https://images.ctfassets.net/lyqay1191tz4/abc123/image.jpg";
    const result = contentfulLoader({ src: testSrc, width: 1200, quality: 80 });

    expect(result).toContain("images.ctfassets.net");
    expect(result).toContain("lyqay1191tz4");
    expect(result).toContain("abc123");
    expect(result).toContain("image.jpg");
  });

  it("should only use Contentful-supported parameters", () => {
    const testSrc = "https://images.ctfassets.net/space/test.jpg";
    const result = contentfulLoader({ src: testSrc, width: 600, quality: 85 });

    // Valid Contentful Images API parameters for WebP
    const url = new URL(result);
    const params = url.searchParams;

    expect(params.get("w")).toBe("600");
    expect(params.get("q")).toBe("85");
    expect(params.get("fm")).toBe("webp");

    // Should NOT have any other parameters
    expect(params.has("fl")).toBe(false);
    expect(params.has("progressive")).toBe(false);
  });
});
