import { Dependency } from './dependency';

/**
 * 
 * 
 * @export
 * @interface WarthogInterface
 */
export interface WarthogInterface {
    url: string;
    ajax: (method: string, url: string, callback: any) => XMLHttpRequest;
}
