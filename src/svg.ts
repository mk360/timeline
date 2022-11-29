import SvgConfig from "./constants/svg-config";

const svgString = `<svg id="${SvgConfig.svgId}" height="${SvgConfig.height}px" width="${SvgConfig.width}px" style="background-color: ${SvgConfig.backgroundColor}" viewBox="${SvgConfig.horizontalCropping} ${SvgConfig.verticalCropping} ${SvgConfig.width} ${SvgConfig.height}"></svg>`;
document.body.innerHTML += svgString;
const SVG = document.getElementById(SvgConfig.svgId)! as HTMLObjectElement;
SVG.style.border = "1px solid black";

export default SVG;
