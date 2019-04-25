import { timer } from './utils'

/**
 * Carousel
 */
export default class Carousel {
  constructor(element, options) {
    this.options = this._options(options)
    this.carousel = element
    this.controller = this.carousel.querySelector('.carousel__controller')
    this.items = this.carousel.querySelectorAll('.carousel__items .item')
    this.nodes = Array.prototype.slice.call(this.items)
    this.maxLength = this.items.length

    this._stop = false

    if (this.maxLength <= 1) {
      throw new Error('You must have at least two items in your carousel!')
    }

    if (!this.carousel.querySelector('.carousel__items .item.active')) {
      this.items[0].classList.add('active')
    }

    this.activeItem = this.carousel.querySelector(
      '.carousel__items .item.active'
    )

    this.initCtrl()
  }

  _options(options) {
    const defaults = {
      autoplay: 0,
      prev: true,
      next: true,
      progress: false,
      loop: false,
    }
    return { ...defaults, ...options }
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
      this.prevCtrl.addEventListener('click', async () => {
        this.stopAutoplay()
        this.prevItem()
      })
    }
    if (this.options.next) {
      await this.createNext()
      this.nextCtrl = this.controller.querySelector('.next')
      this.nextCtrl.addEventListener('click', () => this.nextItem())
    }

    // on hover
    //this.carousel.addEventListener('mouseover', () => this.mouseOver())
    //this.carousel.addEventListener('mouseout', () => this.mouseOut())

    // on autoplay
    if (this.options.autoplay && typeof this.options.autoplay === 'number') {
      this.play()
    } else {
      console.error('Autoplay must be type of number!')
    }
  }

  mouseOver() {
    console.log('STOP')
  }

  mouseOut() {
    console.log('START')
  }

  play() {
    this._timeout = 1000 * this.options.autoplay
    console.log('MAX_LENGTH:', this.maxLength)

    this.playLoop()
    this._call = setInterval(() => this.playLoop(), this._timeout)
  }

  async playLoop() {
    const index = this.nodes.indexOf(this.activeItem)

    console.log('ACTIVE:', index)

    if (this.options.progress) {
      this.startProgress(index)
    }

    if (index === this.maxLength - 1 || this._stop || document.hidden) {
      clearInterval(this._call)
      return // break the loop
    }

    await timer(this._timeout)
    if (this._stop) return

    if (index !== this.maxLength - 1) {
      this.nextItem()
    }
  }

  stopAutoplay() {
    clearInterval(this._call)
    this._progress = this.options.progress
    this.options.progress = false
    this._stop = true

    this._call = setTimeout(() => {
      this.options.progress = this._progress
      this._stop = false
      this.playLoop()
    }, 2000)
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
    let percent = 0
    while (percent <= 100) {
      await timer(this.options.autoplay * 10)
      if (this._stop) {
        this.moveProgress(0, index)
        break
      }
      this.moveProgress(percent, index)
      percent++
    }
  }

  moveProgress(percent, index) {
    const progressBar = this.controller.querySelectorAll('.progress .item')[
      index
    ]
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
      div.innerHTML = this.options.pref
    } else {
      div.innerText = '←'
    }
    this.controller.appendChild(div)
  }

  createNext() {
    const div = document.createElement('div')
    div.classList.add('next')
    if (typeof this.options.pref === 'string') {
      div.innerHTML = this.options.pref
    } else {
      div.innerText = '→'
    }
    this.controller.appendChild(div)
  }

  nextItem() {
    const activeIndex = this.nodes.indexOf(this.activeItem)
    const nextIndex = activeIndex + 1
    this.activeItem.classList.remove('active')
    const nextItem = this.items[nextIndex === this.maxLength ? 0 : nextIndex]
    nextItem.classList.add('active')
    this.activeItem = nextItem
  }

  prevItem() {
    const activeIndex = this.nodes.indexOf(this.activeItem)
    const prevIndex = activeIndex - 1
    this.activeItem.classList.remove('active')
    const prevItem = this.items[prevIndex < 0 ? this.maxLength - 1 : prevIndex]
    prevItem.classList.add('active')
    this.activeItem = prevItem
  }
}
