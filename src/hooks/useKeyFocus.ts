import { useEffect, useRef } from "react";

export default function useKeyFocus<T>(key: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    function shouldFocusSearch(e: KeyboardEvent) {
      console.log(e);

      if (e.key === key) {
        if (e.target instanceof HTMLElement) {
          if (["input", "textarea"].indexOf(e.target?.tagName) == -1) {
            e.preventDefault();

            if (ref.current instanceof HTMLElement) {
              ref.current?.focus();
            }
          }
        }
      }
    }
    document.addEventListener("keypress", shouldFocusSearch);
    return () => {
      document.removeEventListener("keypress", shouldFocusSearch);
    };
  });

  return ref;
}
