import './style.scss'
import './demo.scss'
import 'bootstrap/dist/css/bootstrap.css'

import Carousel from './carousel'
import $ from './sizzle'

const ele = $('.carousel-messtechnik-home')
new Carousel(ele, {
  autoplay: 2, // in seconds
  prev: true,
  next: false,
  progress: true,
  loop: false,
})
