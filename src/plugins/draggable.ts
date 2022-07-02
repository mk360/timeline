function draggable<T extends SVGElement>(element: T) {
    let shouldDrag = false;

    element.onmousedown = function(event) {
        event.preventDefault();
        shouldDrag = true;
    };
    
    element.onmouseup = function() {
        shouldDrag = false;
    };

    element.onclick = function() {
        console.log("on click");
    };
    
    element.onmousemove = function(event) {
        if (!shouldDrag) {
            return;
        }

        const { movementX, movementY } = event;

        switch (true) {
            case element instanceof SVGCircleElement: {
                const currentX = +element.getAttribute('cx');
                const currentY = +element.getAttribute('cy');
                element.setAttribute('cx', (currentX + movementX).toString());
                element.setAttribute('cy', (currentY + movementY).toString());
                break;
            }
            case element instanceof SVGGElement:
                const [currentTransformX, currentTransformY] = element.getAttribute('transform').match(/[0-9]+/g).map(Number) || [0, 0];
                element.setAttribute('transform', `translate(${currentTransformX + movementX}, ${currentTransformY + movementY })`);
                break;
            default: {
                const currentX = +element.getAttribute('x');
                const currentY = +element.getAttribute('y');
                element.setAttribute('y', (currentY + movementY).toString());
                element.setAttribute('x', (currentX + movementX).toString());
            }
        }
    };

    return element;
};

export default draggable;
