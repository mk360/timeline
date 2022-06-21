import SvgConfig from "../constants/svg-config";
import SvgCoordinates from "../interfaces/svg-coordinate";
import getAbsoluteValue from './getAbsoluteValue';

/**
 * Calculate absolute coordinates depending on the configured
 * SVG dimensions, as well as a provided relative percentage.
 * For example, calling this method with (80, 0) will set
 * the coordinates to 80% of the SVG's width,
 * and at 0% of the SVG's height
 * @param relativeX Relative X coordinate (left to right)
 * @param relativeY Relative Y coordinate (top to bottom)
 */
function getAbsoluteCoordinates(relativeX: number, relativeY: number): SvgCoordinates {
    return {
        x: getAbsoluteValue(relativeX, SvgConfig.width),
        y: getAbsoluteValue(relativeY, SvgConfig.height),
    }; 
};

export default getAbsoluteCoordinates;
