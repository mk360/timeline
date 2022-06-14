import getAbsoluteCoordinates from '../getAbsoluteCoordinates';
import SVG from '../svg';

const svgNS = "http://www.w3.org/2000/svg";

class ComponentFactory {
    createCircle(relativeX: number, relativeY: number, radius: number, fillColor: string) {
        const circle = document.createElementNS(svgNS, 'circle');
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);
        circle.setAttribute('cx', x.toString());
        circle.setAttribute('cy', y.toString());
        circle.setAttribute('r', radius.toString());
        circle.setAttribute('fill', fillColor);

        this.appendToSVG(circle);

        return circle;
    };

    private appendToSVG(element: SVGElement) {
        SVG.appendChild(element);
    };
};

export default new ComponentFactory();
