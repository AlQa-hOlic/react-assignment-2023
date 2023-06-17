import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";

import { Post } from "../types/Post";

export async function fetchPosts(
  page = 0,
  search?: string,
  limit = 10
): Promise<{ posts: Post[]; count: number }> {
  const queryParams = new URLSearchParams();
  if (typeof search !== "undefined" && search.trim() !== "") {
    queryParams.append("q", search);
  }

  queryParams.append("_page", page.toString());
  queryParams.append("_limit", limit.toString());

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${queryParams.toString()}`
  );

  if (response.status === 200) {
    const posts = await response.json();
    const count = parseInt(response.headers.get("X-Total-Count") || "0");

    return { posts, count };
  }

  throw new Error("Server error");
}

interface UsePostProps {
  search?: string;
  page?: number;
  limit?: number;
}

// https://jsonplaceholder.typicode.com/posts
export default function usePosts({
  search,
  page = 1,
  limit = 4,
}: UsePostProps) {
  const debouncedSearch = useDebounce(search, 500);
  const queryResult = useQuery(["posts", debouncedSearch, page, limit], () =>
    fetchPosts(page, search, limit)
  );

  return queryResult;
}
