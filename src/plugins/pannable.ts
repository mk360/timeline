function pannable<T extends HTMLObjectElement>(element: T) {
    let shouldPan = false;

    element.style.cursor = 'move';

    element.onmousedown = function() {
        shouldPan = true;
    };

    element.onmouseup = function() {
        shouldPan = false;
    };

    element.onmousemove = function(event) {
        if (shouldPan) {
            const { movementX, movementY } = event;
            const [horizontalOffset, verticalOffset, ...zoomLevels] = element.getAttribute('viewBox').split(' ').map(Number);
            const newHOffset = horizontalOffset - movementX * 1.2;
            const newYOffset = verticalOffset - movementY * 1.2;
            element.setAttribute('viewBox',  `${newHOffset} ${newYOffset} ${zoomLevels.join(' ')}`);
        }
    };

    return element;
};

export default pannable;
