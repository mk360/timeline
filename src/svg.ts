import SvgConfig from "./constants/svg-config";
import pannable from './plugins/pannable';

const svgId = 'timeline-svg';

const svgString = `<svg id="${svgId}" height="${SvgConfig.height}px" width="${SvgConfig.width}px" style="background-color: ${SvgConfig.backgroundColor}" viewBox="${SvgConfig.horizontalCropping} ${SvgConfig.verticalCropping} ${SvgConfig.width} ${SvgConfig.height}"></svg>`;
document.body.innerHTML += svgString;
const SVG = document.getElementById(svgId)! as HTMLObjectElement;
SVG.style.border = "1px solid black";

export default pannable(SVG);
