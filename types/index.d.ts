import React, { Ref } from 'react';
import { ScrollPositionValues, ScrollPositionStore, ScrollPositionProps } from './types';
export declare type ScrollPositionChildrenProps = {
    rContainer: Ref<HTMLDivElement>;
    getScroll: ScrollPositionValues;
    getScrollNode: HTMLDivElement | undefined;
    setScroll: (pos?: ScrollPositionValues) => void;
};
export declare const memoryStore: ScrollPositionStore;
declare const ScrollPosition: React.MemoExoticComponent<({ scrollKey, store, children, ...props }: ScrollPositionProps) => any>;
export default ScrollPosition;
