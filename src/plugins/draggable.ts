function draggable(element: SVGElement) {
    let shouldDrag = false;

    element.onmousedown = function(event) {
        event.preventDefault();
        shouldDrag = true;
    };
    
    element.onmouseup = function() {
        shouldDrag = false;
    };
    
    element.onmousemove = function(event) {
        if (!shouldDrag) {
            return;
        }

        const { movementX, movementY } = event;
        const currentX = +element.getAttribute('cx') || +element.getAttribute('x');
        const currentY = +element.getAttribute('cy') || +element.getAttribute('y');

        element.setAttributeNS(null, 'cx', (currentX + movementX).toString());
        element.setAttributeNS(null, 'cy', (currentY + movementY).toString());
        element.setAttributeNS(null, 'x', (currentX + movementX).toString());
        element.setAttributeNS(null, 'y', (currentY + movementY).toString());
    };

    return element;
};

export default draggable;
