function zoomable<T extends SVGElement>(element: T) {
    element.setAttribute('transform', 'scale(1)');

    element.onwheel = function(event) {
        event.stopPropagation();
        const [zoomLevel] = element.getAttribute('transform').match(/[0-9]+/).map(Number);
        const { deltaY } = event;
        const newZoomLevel = Math.max(1, Math.abs(zoomLevel - deltaY / 100));
        element.setAttribute('transform', `scale(${newZoomLevel})`);
    };

    return element;
};

export default zoomable;
