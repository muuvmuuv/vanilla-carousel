# Vanilla Carousel 🎠

A simple easy to use plain vanilla carousel.

## How to use

Have a look at the examples below or on our [demo](./demo) files, e.g.
[demo.js](./dist/demo.js). For better styling and compatibility I recommend you to
use Bootstrap or somethings similar.

### JavaScript

```js
import Carousel from '../src/carousel'

const ele = document.getElementsByClassName('carousel')[0]

new Carousel(ele, {
  autoplay: false,
  prev: true,
  next: true,
  progress: true,
  loop: false,
})
```

### HTML

```html
<div class="carousel">
  <div class="carousel__items">
    <div class="item">ITEM1</div>
    <div class="item">ITEM2</div>
  </div>
  <div class="container">
    <div class="row no-gutters carousel__controller"></div>
  </div>
</div>
```

This is the minimal setup, if you want to customize the controlls, e.g. wrap them
into a div, you can by creating them _inside_ `carousel__controller`. The following
controllers are provided:

- `<div class="progress"></div>`: the progress childs will be generated inside
- `<div class="prev"></div>`: place some custom input it prev controller (you can do
  this in options as well)
- `<div class="next"></div>`: place some custom input it next controller (you can do
  this in options as well)
- `<div class="play"></div>`: the play button
- `<div class="pause"></div>`: the pause button
- `<div class="stop"></div>`: the stop button

### Options

| Option     | Default | Type              | Description                                                                                                   |
| ---------- | ------- | ----------------- | ------------------------------------------------------------------------------------------------------------- |
| `autoplay` | `false` | boolean \| number | Wanna autoplay your carousel? Set it to true or a number for milliseconds it should take to fade to the next! |
| `prev`     | `true`  | boolean           | Give the user an option to go back in your carousel! Give it a string to personalize it.                      |
| `next`     | `true`  | boolean           | Give the user an option to go to the next in your carousel! Give it a string to personalize it.               |
| `progress` | `false` | boolean           | Set this to true if you want to have progress bars below the carousel.                                        |
| `loop`     | `false` | boolean           | Do you want to loop the carousel so it's started from the beginning at the end? Set it to true!               |
