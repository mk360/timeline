type ElementCallback<T extends SVGElement> = (element: T) => void;

interface HoverCallbacks<T extends SVGElement> {
  in: ElementCallback<T>;
  out: ElementCallback<T>;
}

function hoverable<T extends SVGElement>(element: T, callbacks: HoverCallbacks<T>): T {
  element.onmouseenter = () => {
    callbacks.in.call(element, element);
  };
  element.onmouseleave = () => {
    callbacks.out.call(element, element);
  };

  return element;
};

export default hoverable;
