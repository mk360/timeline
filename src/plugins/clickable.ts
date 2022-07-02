type ClickCallback = (this: GlobalEventHandlers, event: MouseEvent) => void;

function clickable<T extends SVGElement>(element: T, clickCallback: ClickCallback) {
    element.onclick = clickCallback;

    return element;
};

export default clickable;
