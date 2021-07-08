import { RefObject, useEffect, useRef } from "react";

type cb = (e: MouseEvent | TouchEvent) => void;

// From https://stackoverflow.com/a/54292872
export default function useOuterClick(callback: cb) {
  // RefObject<any> & {current: any}
  const callbackRef = useRef<any>(); // initialize mutable callback ref
  const innerRef = useRef<any>(); // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e: MouseEvent | TouchEvent) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
