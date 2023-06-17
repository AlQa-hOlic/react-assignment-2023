import { useState } from "react";

import Post from "./components/Post";
import useKeyFocus from "./hooks/useKeyFocus";
import usePosts from "./hooks/usePosts";

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [search, setSearch] = useState("");

  const inputRef = useKeyFocus<HTMLInputElement>("/");
  const { data, isLoading, isError } = usePosts({ search, page, limit });

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white p-6 text-slate-800">
      <h1 className="my-12 text-4xl">Posts</h1>
      <input
        type="text"
        className={
          "border-input flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
        placeholder="Search posts..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        ref={inputRef}
      />
      {isLoading ? (
        <p className="w-full p-4 text-center text-lg text-slate-700">
          Loading...
        </p>
      ) : isError ? (
        <p className="w-full p-4 text-center text-lg text-rose-700">
          Server error
        </p>
      ) : data?.count === 0 ? (
        <p className="w-full p-4 text-center text-lg text-slate-700">
          No results
        </p>
      ) : (
        <>
          <div className="flex w-full flex-wrap justify-between gap-3 py-4">
            {data?.posts.map((post) => {
              return <Post key={post.id} title={post.title} body={post.body} />;
            })}
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 px-2 md:flex-row">
            <div className="text-muted-foreground flex-1 text-sm">
              Total {data?.count} posts
            </div>
            <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <p className="whitespace-nowrap text-sm font-medium">
                  Rows per page
                </p>
                <select
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                  className="border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-8 w-[70px] items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {[4, 10, 20].map((v) => (
                    <option
                      key={`limit-option-${v}`}
                      selected={limit == v}
                      value={v}
                    >
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {page} of {Math.ceil((data?.count || 0) / limit)}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="focus-visible:ring-ring ring-offset-background border-input hover:bg-accent hover:text-accent-foreground hidden h-8 w-8 items-center justify-center rounded-md border p-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:flex"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  <span className="sr-only">Go to first page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </button>
                <button
                  className="focus-visible:ring-ring ring-offset-background border-input hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border p-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  <span className="sr-only">Go to previous page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={page >= (data?.count || 0) / limit}
                  className="focus-visible:ring-ring ring-offset-background border-input hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border p-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <span className="sr-only">Go to next page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setPage((data?.count || 0) / limit);
                  }}
                  disabled={page >= (data?.count || 0) / limit}
                  className="focus-visible:ring-ring ring-offset-background border-input hover:bg-accent hover:text-accent-foreground hidden h-8 w-8 items-center justify-center rounded-md border p-0 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:flex"
                >
                  <span className="sr-only">Go to last page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
