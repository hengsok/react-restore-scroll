# react-restore-scroll

ScrollPosition HOC which remembers attached node scroll position and restores it.

This project is originally written by https://github.com/bonnevoyager/react-scroll-position and is ported to using Functional Component by Heng Sok as React functional component has better performance than React component. Also add proper types.

This module also has been tested working with NextJS. 

What it does is by wrapping scrollable div on a page and remembers its scroll position onMount and onUnmount of the HTML div element. Just make sure that scrollKey for each page must be unique, preferably using the path of the webpage. For NextJS, can use router.pathname as scrollKey.

## Installation

```
npm install --save react-restore-scroll
or
yarn add react-restore-scroll
```

## Usage
### Typescript example with React Functional Component

```ts

import ScrollPosition, { ScrollPositionChildrenProps } from 'react-restore-scroll'
import { useRouter } from "next/router";

const Page = (props) => (

    const router = useRouter();

    return
      (
        <ScrollPosition scrollKey={router.pathname}>
          {
            ({ rContainer, getScroll, getScrollNode, setScroll }: ScrollPositionChildrenProps) =>
              <div ref={rContainer}>
                other page content
              </div>
          }
        </ScrollPosition>
      )
)


```
Note that scrollKey can be any unique string. You can even pass "/some-page".

ScrollPosition HOC uses children as function and returns functions which can be used to manipulate the scrolling.



#### getScroll

Gets attached `node` x and y scroll positions.

#### getScrollNode

Gets attached HTMLElement `node`.

#### setScroll

Sets attached `node` x and y scroll positions.

## License

[MIT](LICENSE)
