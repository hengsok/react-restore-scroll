import React, { useEffect, useLayoutEffect, useRef, Ref } from 'react'
import {ScrollPositionValues, ScrollPositionStore, ScrollPositionProps} from './types';


const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export declare type ScrollPositionChildrenProps = {
    rContainer: Ref<HTMLDivElement>,
    getScroll: ScrollPositionValues,
    getScrollNode: HTMLDivElement | undefined,
    setScroll: (pos?: ScrollPositionValues) => void
}


function getScrollPosition(target: any) : ScrollPositionValues {
    if (target instanceof window.Window) {
        return {
            x: target.scrollX,
            y: target.scrollY
        };
    }
    return {
        x: target.scrollLeft,
        y: target.scrollTop
    };
}

function scroll(target: any, x: number, y: number) {
    if (target instanceof window.Window) {
        target.scrollTo(x, y);
    } else {
        target.scrollLeft = x;
        target.scrollTop = y;
    }
}

export const memoryStore : ScrollPositionStore = {
    data: new Map(),
    get(key: string) {
        if (!key) {
            return null;
        }
        return this.data.get(key) || null;
    },
    set(key: string, data: any) {
        if (!key) {
            return;
        }
        return this.data.set(key, data);
    }
};






const ScrollPosition = React.memo(({
    scrollKey = 'default',
    store = memoryStore,
    children,
    ...props
}: ScrollPositionProps) => {
    const rContainer = useRef<HTMLDivElement>(null)

    const getScroll = () => {
        if (rContainer && rContainer.current) {
            return getScrollPosition(rContainer.current);
        }
        return null;
    }

    const getScrollNode = () : HTMLDivElement | null => {
        if (rContainer && rContainer.current) {
            return rContainer.current;
        }
        return null;
    }

    const setScroll = (pos?: ScrollPositionValues) => {
        pos = pos || store.get(scrollKey);
        if (rContainer && rContainer.current && pos) {
            scroll(rContainer.current, pos.x, pos.y);
        }
    }

    const saveScroll = (key?: string) => {
        if (rContainer && rContainer.current) {
            const pos = getScrollPosition(rContainer.current);
            key = key || scrollKey;
            store.set(key, pos);
        }
    }

    useIsomorphicLayoutEffect(() => {
        setScroll();
        return function onUnmount() {
            saveScroll();
        };
    }, []);

    return children && children({
        ...props,
        rContainer: rContainer,
        getScroll: getScroll,
        getScrollNode: getScrollNode,
        setScroll: setScroll
    });
});


export default ScrollPosition;

