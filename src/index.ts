import SVG from './svg';
import ComponentFactory from './classes/componentFactory';
import draggable from './plugins/draggable';

const circle = draggable(ComponentFactory.createCircle(50, 50, 50, 'red'));

circle.onmousedown = function() {
    circle.draggable = true;
};

circle.onmouseup = function() {
    circle.draggable = false;
};

circle.onmousemove = function(event) {
    if (!circle.draggable) {
        return;
    }

    circle.setAttributeNS(null, 'cx', event.clientX.toString());
    circle.setAttributeNS(null, 'cy', event.clientY.toString());
};

document.body.appendChild(SVG);
