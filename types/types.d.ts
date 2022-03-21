export interface ScrollPositionValues {
    /**
     * scrollLeft/scrollX values from/for the node/window
     */
    x: number;
    /**
     * scrollTop/scrollY values from/for the node/window
     */
    y: number;
}
/**
 * Object having get/set functions
 */
export interface ScrollPositionStore {
    data: Map<string, ScrollPositionValues>;
    get(key: string): ScrollPositionValues | null;
    set(key: string, data: ScrollPositionValues): void;
}
export interface ScrollPositionProps {
    scrollKey?: string;
    store?: any;
    children: any;
}
