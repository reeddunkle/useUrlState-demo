import { useCallback, useMemo, useRef } from "react";

import { ensureLeadingQuestion, isFunction, queryString } from "./util";

function useUrlState(
  initialState = {},
  onStateChange,
  searchString = "",
  options = {}
) {
  const serialize = useMemo(() => {
    return options.serialize ?? queryString.stringify;
  }, [options]);

  const deserialize = useMemo(() => {
    return options.deserialize ?? queryString.parse;
  }, [options]);

  const initialStateRef = useRef(
    isFunction(initialState) ? initialState() : initialState
  );

  const hasInitRef = useRef(false);

  const urlState = useMemo(() => {
    const currentUrlState = deserialize(searchString);

    return {
      ...(hasInitRef.current ? {} : initialStateRef.current),
      ...currentUrlState,
    };
  }, [deserialize, searchString]);

  const setUrlState = useCallback(
    (nextState, ...rest) => {
      const query = serialize(
        isFunction(nextState) ? nextState(urlState) : nextState
      );

      hasInitRef.current = true;

      onStateChange(ensureLeadingQuestion(query), ...rest);
    },
    [onStateChange, serialize, urlState]
  );

  return [urlState, setUrlState];
}

export default useUrlState;
