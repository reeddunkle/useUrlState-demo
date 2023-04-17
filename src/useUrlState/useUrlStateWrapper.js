import useNavigate from "./useNavigate";
import useSearchParams from "./useSearchParams";
import useUrlState from "./useUrlState";

import { isFunction } from "./util";

function useUrlStateWrapper(initialState = {}, options = {}) {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();

  const onStateChange = navigate;

  const [urlState, setUrlState] = useUrlState(
    initialState,
    onStateChange,
    searchString,
    options
  );

  const mergeState = (nextState) => {
    setUrlState((curState) => {
      return {
        ...curState,
        ...(isFunction(nextState) ? nextState(curState) : nextState),
      };
    });
  };

  return [urlState, mergeState];
}

export default useUrlStateWrapper;
