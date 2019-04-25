import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'
import './demo.scss'

import Carousel from './carousel'

const ele = document.getElementsByClassName('carousel-messtechnik-home')[0]
new Carousel(ele, {
  autoplay: false,
  prev: true,
  next: true,
  progress: true,
  loop: false,
})
