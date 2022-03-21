import React, { useLayoutEffect, useRef } from 'react'


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




export interface ScrollPositionProps {
    scrollKey?: string
    store?: any,
    children: any
}

const ScrollPosition = React.memo(({
    scrollKey = 'default',
    store = memoryStore,
    children,
    ...props
}: ScrollPositionProps) => {
    const rContainer = useRef<HTMLElement>(null)

    const getScroll = () => {
        if (rContainer && rContainer.current) {
            return getScrollPosition(rContainer.current);
        }
    }

    const getScrollNode = () : HTMLElement | undefined => {
        if (rContainer && rContainer.current) {
            return rContainer.current;
        }
    }

    const setScroll = (pos?: ScrollPositionValues) => {
        pos = pos || store.get(scrollKey);
        if (rContainer && rContainer.current && pos) {
            scroll(rContainer.current, pos.x, pos.y);
        }
    }

    const saveScroll = (key?: string) => {
        console.debug(rContainer)
        if (rContainer && rContainer.current) {
            const pos = getScrollPosition(rContainer.current);
            key = key || scrollKey;
            store.set(key, pos);
        }
    }

    useLayoutEffect(() => {
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

