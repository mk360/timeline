const SvgConfig = {
    height: 200,
    width: 700,
    backgroundColor: 'white',
    horizontalCropping: 0,
    verticalCropping: 0,
    temporalLineHeight: 140,
    eventBoxHeight: 45,
    panningOffset: 5,
    panningSensitivity: 1.2,
    svgId: 'timeline-svg'
};

interface SvgConfig {
    height: number;
    width: number;
    backgroundColor: string;
    horizontalCropping: number;
    verticalCropping: number;
    temporalLineHeight: number;
    eventBoxHeight: number;
    panningOffset: number;
    panningSensitivity: number;
    svgId: string;
}

export default SvgConfig;
