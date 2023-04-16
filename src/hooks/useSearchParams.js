import { createContext, useEffect, useContext, useState } from "react";

const isBrowser = typeof window !== "undefined";

function getCurrentSearchParams() {
  const search = isBrowser ? window.location.search : "";
  return new URLSearchParams(search);
}

const SearchParamsContext = createContext(getCurrentSearchParams());

const SearchParamsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(getCurrentSearchParams());

  useEffect(() => {
    const handleLocationChange = () => {
      setSearchParams(getCurrentSearchParams());
    };

    ["popstate", "pushstate", "replacestate"].forEach((eventType) => {
      window.addEventListener(eventType, handleLocationChange);
    });

    return () => {
      ["popstate", "pushstate", "replacestate"].forEach((eventType) => {
        window.removeEventListener(eventType, handleLocationChange);
      });
    };
  }, []);

  return (
    <SearchParamsContext.Provider value={searchParams}>
      {children}
    </SearchParamsContext.Provider>
  );
};

function useSearchParams() {
  return useContext(SearchParamsContext);
}

export default useSearchParams;
export { SearchParamsProvider };
