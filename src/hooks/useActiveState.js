/* eslint-disable import/no-anonymous-default-export */
import { useCallback, useRef, useState } from "react";

/* Previous Active Selector and Set Open Functions */
let prevActiveSelector = null;
let prevActiveSetOpen = null;

/* Manage Active State Function */
const manageActiveState = (setState, selector) => {
  /* Check if Set Open function is already set */
  if (prevActiveSetOpen === setState) return;

  /* Reset previous active selector and set open function */
  if (prevActiveSetOpen) {
    prevActiveSetOpen(false);
    prevActiveSetOpen = null;
    prevActiveSelector = null;
  }

  /* Set new active selector and set open function */
  if (setState instanceof Function) {
    prevActiveSetOpen = setState;
    prevActiveSelector = selector;
    setState(true);
  }
};

/* Handle In Event Function */
const handleInEvent = (e) => {
  /* Check if event target is within the active selector */
  if (prevActiveSelector?.contains(e.target)) return;
  manageActiveState();
};

/* Add Event Listeners */
window.addEventListener("contextmenu", manageActiveState);
window.addEventListener("blur", manageActiveState);
document.addEventListener("click", handleInEvent);
document.addEventListener("focusin", handleInEvent);

// Default export: a function that takes a selector argument and returns an array
export default (selector) => {
  // Declare the active state variable and a state setter function using the useState hook
  const [active, setActive] = useState(false);

  // Declare the contentRef variable using the useRef hook
  const contentRef = useRef();

  // Declare the activeRef variable using the useRef hook
  const activeRef = useRef({ active, selector });
  // Set the active property of activeRef.current to the value of the active variable
  activeRef.current.active = active;
  // Set the selector property of activeRef.current to the value of the selector argument
  activeRef.current.selector = selector;

  // Declare the manageState function using the useCallback hook
  const manageState = useCallback((showOrHide) => {
    // Declare the containerInfo variable and assign it the value of contentRef.current if it exists,
    // or the current value of the selector property of activeRef.current if it is an Element,
    // or the value of the selector argument if it is an Element
    const containerInfo =
      contentRef.current ??
      // @ts-ignore
      activeRef.current.selector?.current ??
      activeRef.current.selector;

    // If containerInfo is not an Element, return false
    if (!(containerInfo instanceof Element)) {
      return false;
    }

    // If the type of the showOrHide argument is not a boolean,
    // assign the opposite of the current value of the active property of activeRef.current to showOrHide
    if (typeof showOrHide !== "boolean") {
      showOrHide = !activeRef.current.active;
    }

    // If showOrHide is truthy, call the manageActiveState function with the setActive and containerInfo arguments.
    // If showOrHide is falsy, call the manageActiveState function with no arguments.
    showOrHide
      ? manageActiveState(setActive, containerInfo)
      : manageActiveState();

    // Return the showOrHide argument
    return showOrHide;
  }, []);

  // Return an array containing the active state variable, the manageState function, and the contentRef variable
  return [active, manageState, contentRef];
};
