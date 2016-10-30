import { Warthog } from './../warthog';

/**
 * 
 * 
 * @export
 * @interface ModuleInterface
 */
export interface ModuleInterface {
    parent: Warthog;
    init: () => void;
}
