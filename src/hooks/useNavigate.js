import { useCallback } from "react";

function useNavigate() {
  const navigate = useCallback((url, replace = false) => {
    const method = replace ? "replaceState" : "pushState";

    window.history[method]({}, "", url);

    window.dispatchEvent(new Event("popstate"));
  }, []);

  return navigate;
}

export default useNavigate;
