import { Dependency } from './dependency';

/**
 * 
 * 
 * @export
 * @interface WarthogInterface
 */
export interface WarthogInterface {
    dependencies: Dependency[];
    dependenciesLoaded: number;
    url: string;
    ajax: (method: string, url: string, callback: any) => XMLHttpRequest;
}
