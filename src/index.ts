import ComponentFactory from './classes/componentFactory';
import draggable from './plugins/draggable';

const circle = draggable(ComponentFactory.createCircle(50, 50, 50, 'red'));

const box = draggable(ComponentFactory.createBox(0, 0, 140, 140, 'blue'));
const text = draggable(ComponentFactory.createText(0, 70, 'jellow world', 50, 'purple'));

const line = ComponentFactory.createLine(40, 40, 300, 180, 'pink', 20);