import { getAllPosts, getPostAndMorePosts } from "./api";

// Mock do fetch global
global.fetch = jest.fn();

describe("Contentful API Integration", () => {
  beforeEach(() => {
    // Reset mocks antes de cada teste
    jest.clearAllMocks();
  });

  describe("getAllPosts", () => {
    it("should fetch posts from Contentful API", async () => {
      const mockResponse = {
        data: {
          postCollection: {
            items: [
              {
                slug: "test-post",
                title: "Test Post",
                date: "2025-01-01",
                excerpt: "Test excerpt",
              },
            ],
          },
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      const posts = await getAllPosts(false);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("graphql.contentful.com"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: expect.stringContaining("Bearer"),
          }),
        })
      );
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("test-post");
    });

    it("should use correct Contentful Space ID", async () => {
      const mockResponse = {
        data: { postCollection: { items: [] } },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      await getAllPosts(false);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const url = fetchCall[0];

      expect(url).toContain(process.env.CONTENTFUL_SPACE_ID);
    });

    it("should use preview token when in draft mode", async () => {
      const mockResponse = {
        data: { postCollection: { items: [] } },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      await getAllPosts(true);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const config = fetchCall[1];

      expect(config.headers.Authorization).toContain("Bearer");
    });
  });

  describe("getPostAndMorePosts", () => {
    it("should fetch a specific post and related posts", async () => {
      const mockPostResponse = {
        data: {
          postCollection: {
            items: [
              {
                slug: "main-post",
                title: "Main Post",
                date: "2025-01-01",
              },
            ],
          },
        },
      };

      const mockMorePostsResponse = {
        data: {
          postCollection: {
            items: [
              { slug: "related-1", title: "Related 1" },
              { slug: "related-2", title: "Related 2" },
            ],
          },
        },
      };

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({ json: async () => mockPostResponse })
        .mockResolvedValueOnce({ json: async () => mockMorePostsResponse });

      const result = await getPostAndMorePosts("main-post", false);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result.post.slug).toBe("main-post");
      expect(result.morePosts).toHaveLength(2);
    });
  });

  describe("Contentful API Connection", () => {
    it("should have CONTENTFUL_SPACE_ID configured", () => {
      expect(process.env.CONTENTFUL_SPACE_ID).toBeDefined();
      expect(process.env.CONTENTFUL_SPACE_ID).not.toBe("");
    });

    it("should have CONTENTFUL_ACCESS_TOKEN configured", () => {
      expect(process.env.CONTENTFUL_ACCESS_TOKEN).toBeDefined();
      expect(process.env.CONTENTFUL_ACCESS_TOKEN).not.toBe("");
    });

    it("should make requests to correct Contentful GraphQL endpoint", async () => {
      const mockResponse = {
        data: { postCollection: { items: [] } },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockResponse,
      });

      await getAllPosts(false);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const url = fetchCall[0];

      expect(url).toMatch(
        /^https:\/\/graphql\.contentful\.com\/content\/v1\/spaces\//
      );
    });
  });
});
