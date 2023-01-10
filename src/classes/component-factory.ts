import getAbsoluteCoordinates from '../methods/get-absolute-coordinates';
import degreesToRadians from '../methods/degrees-to-radians';
import zoomable from '../plugins/zoomable';
import getAbsoluteValue from '../methods/get-absolute-value';
import SvgConfig from '../constants/svg-config';
import '../css/index.scss';

const svgNS = "http://www.w3.org/2000/svg";

class ComponentFactory {
    private config: SvgConfig;
    private rootGroupElement: SVGGElement;

    constructor(config: SvgConfig) {
        this.config = config;
    }

    createSVG() {
        const group = zoomable(document.createElementNS(svgNS, 'g'));
        const svgString = `<svg id="${this.config.svgId}" height="${this.config.height}px" width="${this.config.width}px" style="background-color: ${this.config.backgroundColor}" viewBox="${this.config.horizontalCropping} ${this.config.verticalCropping} ${this.config.width} ${this.config.height}"></svg>`;
        this.config.parentElement.innerHTML += svgString;
        const svgElement = document.getElementById(this.config.svgId);
        svgElement.setAttribute("style", `background-color: ${this.config.backgroundColor}; border: 1px solid black`);
        svgElement.setAttribute("viewBox", `${this.config.horizontalCropping} ${this.config.verticalCropping} ${this.config.width} ${this.config.height}`)
        svgElement.setAttributeNS(svgNS, "height", this.config.height.toString() + "px");
        svgElement.setAttributeNS(svgNS, "width", this.config.width.toString() + "px");
        svgElement.append(group);
        this.rootGroupElement = group;
        return group;
    }

    createAbsoluteGroup(appendToSVG = true) {
        const childGroup = document.createElementNS(svgNS, 'g');

        if (appendToSVG) {
            this.appendToSVG(childGroup);
        }

        return childGroup;
    };

    createBox(relativeX: number, relativeY: number, height: number, width: number) {
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);

        return this.createAbsoluteBox(x, y, height, width);
    };

    createAbsoluteBox(x: number, y: number, height: number, width: number,  appendToSVG = true) {
        const box = document.createElementNS(svgNS, 'rect');
        box.setAttribute('x', x.toString());
        box.setAttribute('y', y.toString());
        box.setAttribute('height', height.toString());
        box.setAttribute('width', width.toString());

        if (appendToSVG) {
            this.appendToSVG(box);
        }

        return box;
    };

    createText(relativeX: number, relativeY: number, content: string, pixelSize: number, color: string, appendToSVG = true) {
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);
        const sizeInSVG = getAbsoluteValue(pixelSize, this.config.height);

        return this.createAbsoluteText(x, y, content, sizeInSVG, color, appendToSVG);
    };

    createAbsoluteText(x: number, y: number, content: string, pixelSize: number, color: string, appendToSVG = true) {
        const text = document.createElementNS(svgNS, 'text');
        text.innerHTML = content;
        text.setAttribute('x', x.toString());
        text.setAttribute('y', y.toString());
        text.setAttribute('fill', color);
        text.setAttribute('font-size', pixelSize.toString() + 'px');

        if (appendToSVG) {
            this.appendToSVG(text);
        }

        return text;
    };

    createLine(relativeX: number, relativeY: number, length: number, angle: number, color: string, strokeWidth: number, appendToSVG = true) {
        const { x, y } = getAbsoluteCoordinates(relativeX, relativeY);

        return this.createAbsoluteLine(x, y, length, angle, color, strokeWidth, appendToSVG);
    };

    createAbsoluteLine(x: number, y: number, length: number, angle: number, color: string, strokeWidth: number, appendToSVG = true) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', x.toString());
        line.setAttribute('y1', y.toString());
        const radians = degreesToRadians(angle);
        const x2 = x + length * Math.cos(radians);
        const y2 = y + length * Math.sin(radians);
        line.setAttribute('x2', x2.toString());
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', strokeWidth.toString());
        line.setAttribute('y2', y2.toString());

        if (appendToSVG) {
            this.appendToSVG(line);
        }

        return line;
    };

    private appendToSVG(element: SVGElement) {
        this.rootGroupElement.appendChild(element);
    };
};

export default ComponentFactory;
