import SvgConfig from "./constants/svg-config";
import SvgCoordinates from "./interfaces/svg-coordinate";

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
        x: SvgConfig.width * relativeX / 100,
        y: SvgConfig.height * relativeY / 100,
    }; 
};

export default getAbsoluteCoordinates;
