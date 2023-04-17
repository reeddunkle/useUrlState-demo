import { useEffect, useState } from "react";
import { act, cleanup, renderHook } from "@testing-library/react";

import useUrlState from "./useUrlState";

const noop = () => {};

afterEach(cleanup);

describe("useUrlState", () => {
  test("should parse search string", () => {
    const { result } = renderHook(() => {
      return useUrlState({}, noop, "foo=bar&values=1,2,3");
    });

    const [parsedUrl] = result.current;

    expect(parsedUrl).toEqual({
      foo: "bar",
      values: [1, 2, 3],
    });
  });

  test("should initialize state", () => {
    const { result } = renderHook(() => {
      return useUrlState(
        {
          foo: "bar",
          values: [1, 2, 3],
        },
        noop,
        ""
      );
    });

    const [parsedUrl] = result.current;

    expect(parsedUrl).toEqual({
      foo: "bar",
      values: [1, 2, 3],
    });
  });

  test("should merge initial state", () => {
    const { result } = renderHook(() => {
      return useUrlState(
        {
          foo: "bar",
          values: [1, 2, 3],
        },
        noop,
        "cat=tiger&values=9,8,7"
      );
    });

    const [parsedUrl] = result.current;

    expect(parsedUrl).toEqual({
      cat: "tiger",
      foo: "bar",
      values: [9, 8, 7],
    });
  });

  test("should wire up navigation", () => {
    const initialState = {
      foo: "bar",
      values: [1, 2, 3],
    };

    const newState = { food: "bear" };

    const { result } = renderHook(() => {
      const [searchString, setNavigationString] = useState("");

      const onStateChange = (toUrl) => setNavigationString(toUrl);

      const [urlState, setUrlState] = useUrlState(
        initialState,
        onStateChange,
        searchString
      );

      useEffect(() => {
        setUrlState(newState);
      }, []);

      return [searchString, urlState];
    });

    const [searchString, urlState] = result.current;

    expect(searchString).toEqual("?food=bear");
    expect(urlState).toEqual(newState);
  });
});
