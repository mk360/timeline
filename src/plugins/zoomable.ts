import SVG from "../svg";

function zoomable<T extends SVGElement>(element: T) {
    element.onwheel = function(event) {
        const [zoomLevel] = element.getAttribute('transform').match(/[0-9]+/).map(Number);
        const { deltaY } = event;
        const newZoomLevel = Math.abs(zoomLevel + deltaY / 12);
        event.stopPropagation();
        element.setAttribute('transform', `scale(${newZoomLevel})`);
    };

    return element;
};

export default zoomable;
