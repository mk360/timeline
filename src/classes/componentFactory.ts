import getAbsoluteCoordinates from '../methods/getAbsoluteCoordinates';
import SVG from '../svg';
import degreesToRadians from '../methods/degreesToRadians';
import zoomable from '../plugins/zoomable';

const svgNS = "http://www.w3.org/2000/svg";
const group = zoomable(document.createElementNS(svgNS, 'g'));
group.setAttribute('transform', 'scale(1)');
SVG.appendChild(group);

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

    createBox(relativeX: number, relativeY: number, height: number, width: number, fillColor: string) {
        const box = document.createElementNS(svgNS, 'rect');
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);
        box.setAttribute('x', x.toString());
        box.setAttribute('y', y.toString());
        box.setAttribute('height', height.toString());
        box.setAttribute('width', width.toString());
        box.setAttribute('fill', fillColor);

        this.appendToSVG(box);

        return box;
    };

    createText(relativeX: number, relativeY: number, content: string, relativeSize: number, color: string) {
        const text = document.createElementNS(svgNS, 'text');
        text.textContent = content;
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);
        text.setAttribute('x', x.toString());
        text.setAttribute('y', y.toString());
        text.setAttribute('fill', color);
        text.setAttribute('font-size', relativeSize.toString() + 'px');

        this.appendToSVG(text);

        return text;
    };

    createLine(relativeX: number, relativeY: number, length: number, angle: number, color: string, strokeWidth: number) {
        const line = document.createElementNS(svgNS, 'line');
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);
        line.setAttribute('x1', x.toString());
        line.setAttribute('y1', y.toString());
        const radians = degreesToRadians(angle);
        const x2 = x + length * Math.cos(radians);
        const y2 = y + length * Math.sin(radians);
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        line.setAttribute('style', `stroke:${color};stroke-width:${strokeWidth}`);

        this.appendToSVG(line);

        return line;
    };

    createGroup() {

        this.appendToSVG(group);
    }

    private appendToSVG(element: SVGElement) {
        group.appendChild(element);
    };
};

export default new ComponentFactory();
