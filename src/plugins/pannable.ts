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
            const newHOffset = Math.max(horizontalOffset - movementX * 1.2, 0);
            const newYOffset = Math.max(verticalOffset - movementY * 1.2, 0);
            element.setAttribute('viewBox',  `${newHOffset} ${newYOffset} ${zoomLevels.join(' ')}`);
        }
    };

    return element;
};

export default pannable;
