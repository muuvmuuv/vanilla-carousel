import { timer } from './utils'

/**
 * Carousel
 */
export default class Carousel {
  constructor(element, options) {
    const defaults = {
      autoplay: 0,
      prev: true,
      next: true,
      progress: false,
      loop: false,
    }

    this.options = { ...defaults, ...options }
    this.carousel = element
    this.controller = this.carousel.querySelector('.carousel__controller')

    this.items = this.carousel.querySelectorAll('.carousel__items .item')
    this.nodes = Array.from(this.items)
    this.maxLength = this.items.length
    this.maxArrayLength = this.maxLength - 1

    if (this.maxLength <= 1) {
      throw new Error('You must have at least two items in your carousel!')
    }

    if (!this.carousel.querySelector('.carousel__items .item.active')) {
      this.items[0].classList.add('active')
    }

    this.activeItem = this.carousel.querySelector('.carousel__items .item.active')

    this.buildHeight()
    this.createKey() // just for developing to better diff the items
    this.initCtrl()
  }

  async initCtrl() {
    // with progress
    if (this.options.progress) {
      await this.createProgress()
    }

    // on click
    if (this.options.prev) {
      await this.createPrev()
      this.prevCtrl = this.controller.querySelector('.prev')
      this.prevCtrl.addEventListener('click', () => {
        this.stop()
        this.prevItem()
      })
    }
    if (this.options.next) {
      await this.createNext()
      this.nextCtrl = this.controller.querySelector('.next')
      this.nextCtrl.addEventListener('click', () => {
        this.stop()
        this.nextItem()
      })
    }

    // on mouse
    this.carousel.addEventListener('mouseover', () => this.mouseOver())
    //this.carousel.addEventListener('mouseout', () => this.mouseOut())

    // on autoplay
    if (this.options.autoplay) {
      if (typeof this.options.autoplay !== 'number') {
        console.error('Autoplay must be type of number!')
      } else if (this.options.autoplay <= 500) {
        console.error('Autoplay must be higher then 500!')
      } else {
        this.autoplay()
      }
    }
  }

  mouseOver() {
    console.log('PAUSE')
  }

  mouseOut() {
    console.log('START')
  }

  read() {
    return new Date().getTime() - this._time
  }

  autoplay() {
    this._timeout = this.options.autoplay
    this._stop = false
    this._paused = false
    this._time = 0
    this._running = false
    this.autoplayNext()
  }

  pause() {
    if (this._paused && !this._running) return // prevent multible calls
    // prettier-ignore
    const pastTime = new Date().getTime() - this._time
    this._timeout = Math.round(this._timeout - pastTime) + 1
    this._paused = true
    this._running = false
    this._time = 0
  }

  play() {
    if (!this._paused && this._running) return // prevent multible calls
    this._paused = false
    this.autoplayNext()
  }

  async autoplayNext() {
    if (this._running) return
    this._running = true
    this._time = new Date().getTime() // start timer
    const index = this.nodes.indexOf(this.activeItem)

    if (this.options.progress) {
      this.startProgress(index)
    }

    // sleep
    let stp = 0
    while (stp !== Math.round(this._timeout / 100)) {
      await timer(100)
      if (this._stop || this._paused) return
      if (document.hidden) continue
      stp++
    }

    this._running = false
    this._timeout = this.options.autoplay

    if (index !== this.maxArrayLength) {
      this.nextItem()
      this.autoplayNext()
    }

    if (this.options.loop && index === this.maxArrayLength) {
      this.nextItem()
      this.autoplay()
    }
  }

  stop() {
    this._stop = true
    this._running = false
    if (this.options.autoplay) {
      clearTimeout(this._call)
      this._call = setTimeout(() => {
        this.autoplay()
      }, 1000)
    }
  }

  createKey() {
    for (let i = 0; i < this.maxLength; i++) {
      this.items[i].setAttribute('index', i)
    }
  }

  buildHeight() {
    let maxHeight = 0
    for (let i = 0; i < this.maxLength; i++) {
      const height = this.items[i].getElementsByClassName('inner')[0].offsetHeight
      if (height > maxHeight) maxHeight = height
    }
    console.log(maxHeight)

    this.carousel.getElementsByClassName(
      'carousel__items'
    )[0].style.height = `${maxHeight}px`
  }

  createProgress() {
    const progress = document.createElement('div')
    progress.classList.add('progress')
    const progressEle = this.controller.appendChild(progress)
    for (let i = 0; i < this.maxLength; i++) {
      const newProgressBarItem = document.createElement('div')
      newProgressBarItem.classList.add('item')
      const inner = document.createElement('div')
      newProgressBarItem.appendChild(inner)
      progressEle.appendChild(newProgressBarItem)
    }
  }

  async startProgress(index) {
    const timeoutPrecent = Math.round((this._timeout / this.options.autoplay) * 100)
    let percent = timeoutPrecent === 100 ? 0 : (timeoutPrecent - 100) * -1
    while (percent <= 100) {
      await timer(this.options.autoplay / 100)
      if (this._stop) {
        this.moveProgress(0, index)
      }
      if (document.hidden) {
        continue
      }
      if (this._stop || this._paused) {
        break
      }
      this.moveProgress(percent, index)
      percent++
    }
  }

  moveProgress(percent, index) {
    const progressBar = this.controller.querySelectorAll('.progress .item')[index]
    const inner = progressBar.getElementsByTagName('div')[0]
    progressBar.classList.remove('transition')
    inner.style.width = `${percent}%`
    if (percent === 100) {
      progressBar.classList.add('transition')
      inner.style.width = '0%'
    }
  }

  createPrev() {
    const div = document.createElement('div')
    div.classList.add('prev')
    if (typeof this.options.pref === 'string') {
      div.innerHTML = this.options.prev
    } else {
      div.innerText = '←'
    }
    this.controller.appendChild(div)
  }

  createNext() {
    const div = document.createElement('div')
    div.classList.add('next')
    if (typeof this.options.next === 'string') {
      div.innerHTML = this.options.next
    } else {
      div.innerText = '→'
    }
    this.controller.appendChild(div)
  }

  nextItem() {
    if (document.hidden) return
    this.activeItem.classList.remove('active')
    const activeIndex = this.nodes.indexOf(this.activeItem)
    const nextIndex = activeIndex === this.maxArrayLength ? 0 : activeIndex + 1
    const nextItem = this.items[nextIndex]
    nextItem.classList.add('active')
    this.activeItem = nextItem
  }

  prevItem() {
    if (document.hidden) return
    this.activeItem.classList.remove('active')
    const activeIndex = this.nodes.indexOf(this.activeItem)
    const prevIndex = activeIndex - 1 < 0 ? this.maxArrayLength : activeIndex - 1
    const prevItem = this.items[prevIndex]
    prevItem.classList.add('active')
    this.activeItem = prevItem
  }
}
