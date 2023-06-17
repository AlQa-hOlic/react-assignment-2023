import { fetchPosts } from "../hooks/usePosts";

describe("fetchPosts", () => {
  it("should return a list of posts", async () => {
    const response = await fetchPosts();

    expect(response).toHaveProperty("count");
    expect(response).toHaveProperty("posts");
  }, 4000);

  it("should return a 13 posts", async () => {
    const response = await fetchPosts(1, "", 13);

    expect(response).toHaveProperty("count");
    expect(response).toHaveProperty("posts");
    expect(response.posts).toHaveLength(13);
  }, 4000);
});
