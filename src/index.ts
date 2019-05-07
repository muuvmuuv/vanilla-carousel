import './style.scss'

import { timer, visibilityChange } from './utils'

export interface ICarousel {
  autoplay: number | boolean
  prev: string | boolean
  next: string | boolean
  progress: boolean
  loop: boolean
  pauseOnHover: boolean
  keyboardNav: boolean
}

export default class Carousel {
  public options: ICarousel

  carousel: Element
  controller: HTMLElement
  items: HTMLCollectionOf<Element>
  itemsEle: Element
  nodes: Element[]
  maxLength: number
  maxArrayLength: number
  activeItem: Element

  private _hidden: boolean = false
  private _timeout: number | boolean = false
  private _stop: boolean = false
  private _paused: boolean = false
  private _time: number = 0
  private _running: boolean = false
  private _call: NodeJS.Timeout

  constructor(element: Element, options: ICarousel) {
    const defaults: ICarousel = {
      autoplay: 0,
      prev: false,
      next: false,
      progress: false,
      loop: false,
      pauseOnHover: false,
      keyboardNav: false,
    }

    this.options = { ...defaults, ...options }
    this.carousel = element
    this.controller = <HTMLElement>this.carousel.querySelector('.carousel__controller') // prettier-ignore

    const itemsEle = this.carousel.querySelector('.carousel__items')
    if (!itemsEle) {
      throw new Error("Please create a `carousel__items` element with `item`'s!")
    }
    this.itemsEle = itemsEle

    this.items = this.itemsEle.getElementsByClassName('item')
    this.nodes = Array.from(this.items)
    this.maxLength = this.items.length
    this.maxArrayLength = this.maxLength - 1

    if (this.maxLength <= 1) {
      throw new Error('You must have at least two items in your carousel!')
    }

    if (!this.carousel.querySelector('.carousel__items .item.active')) {
      this.items[0].classList.add('active')
    }

    this.activeItem = <HTMLElement>this.itemsEle.querySelector('.item.active') // prettier-ignore

    this.buildHeight()
    this.createKey() // just for developing to better diff the items
    this.initCtrl()
    this.onHiddenDocument()
  }

  async onHiddenDocument() {
    visibilityChange(hidden => {
      if (hidden) {
        console.log('STOP')
        this.stop(true)
      } else {
        console.log('PLAY')
        this.autoplay()
      }
    })
  }

  async initCtrl() {
    if (!this.controller) {
      throw new Error(
        'You must have a controller element if you want to use controlls!'
      )
    }

    // with progress
    if (this.options.progress) {
      await this.createProgress()
    }

    // on click
    if (this.options.prev && this.controller) {
      let prevCtrl = this.controller.querySelector('.prev')
      if (!prevCtrl) {
        prevCtrl = await this.createPrev()
      }
      prevCtrl.addEventListener('click', () => {
        this.stop()
        this.prevItem()
      })
    }
    if (this.options.next && this.controller) {
      let nextCtrl = this.controller.querySelector('.next')
      if (!nextCtrl) {
        nextCtrl = await this.createNext()
      }
      nextCtrl.addEventListener('click', () => {
        this.stop()
        this.nextItem()
      })
    }

    // on play, pause, stop
    const play = <HTMLElement>this.controller.querySelector('.play')
    if (play) {
      play.addEventListener('click', () => {
        this.play()
      })
    }
    const pause = <HTMLElement>this.controller.querySelector('.pause')
    if (pause) {
      pause.addEventListener('click', () => {
        this.pause()
      })
    }
    const stop = <HTMLElement>this.controller.querySelector('.stop')
    if (stop) {
      stop.addEventListener('click', () => {
        this.stop()
      })
    }

    // on mouse
    this.itemsEle.addEventListener('mouseenter', e => this.mouseOver(e), true)
    this.itemsEle.addEventListener('mouseleave', e => this.mouseOut(e), true)

    // on keyboard
    if (this.options.keyboardNav) {
      document.addEventListener('keydown', event => {
        switch (event.keyCode) {
          case 37:
            this.stop()
            this.prevItem()
            break
          case 39:
            this.stop()
            this.nextItem()
            break
        }
      })
    }

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

  mouseOver(event: any) {
    if (event.target !== this.itemsEle) return
    this.pause()
  }

  mouseOut(event: any) {
    if (event.target !== this.itemsEle) return
    this.play()
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
    if (this._paused || !this._running) return // prevent multiple calls
    const pastTime = new Date().getTime() - this._time
    this._timeout = Math.round(Number(this._timeout) - pastTime) + 1
    this._paused = true
    this._running = false
    this._time = 0
  }

  play() {
    if (!this._paused || this._running) return // prevent multiple calls
    this._paused = false
    this._stop = false
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
    while (stp !== Math.round(Number(this._timeout) / 100)) {
      await timer(100)
      if (this._stop || this._paused) return
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

  stop(noPlay: boolean = false) {
    clearTimeout(this._call)
    this._stop = true
    this._running = false
    this._paused = false
    const progressBarActive = this.controller.querySelector('.progress .item.active')
    if (progressBarActive) {
      const inner = progressBarActive.getElementsByTagName('div')[0]
      inner.style.width = '0%'
    }
    if (this.options.autoplay && !noPlay) {
      this._call = setTimeout(() => {
        this.autoplay()
      }, 1000)
    }
  }

  createKey() {
    for (let i = 0; i < this.maxLength; i++) {
      this.items[i].setAttribute('index', i.toString())
    }
  }

  buildHeight() {
    let maxHeight = 0
    for (let i = 0; i < this.maxLength; i++) {
      const height = (<HTMLElement>this.items[i].getElementsByClassName('inner')[0])
        .offsetHeight
      if (height > maxHeight) maxHeight = height
    }
    ;(<HTMLElement>this.carousel.getElementsByClassName('carousel__items')[0]).style.height = `${maxHeight}px` // prettier-ignore
  }

  createProgress() {
    let progress = this.controller.getElementsByClassName('progress')[0]
    if (!progress) {
      progress = document.createElement('div')
      progress.classList.add('progress')
      progress = this.controller.appendChild(progress)
    }
    for (let i = 0; i < this.maxLength; i++) {
      const newProgressBarItem = document.createElement('div')
      newProgressBarItem.classList.add('item')
      const inner = document.createElement('div')
      newProgressBarItem.appendChild(inner)
      progress.appendChild(newProgressBarItem)
    }
  }

  async startProgress(index: number) {
    const timeoutPrecent = Math.round(
      (Number(this._timeout) / Number(this.options.autoplay)) * 100
    )
    let percent = timeoutPrecent === 100 ? 0 : (timeoutPrecent - 100) * -1
    while (percent <= 100) {
      await timer(Number(this.options.autoplay) / 100)
      if (this._stop) {
        this.moveProgress(0, index)
      }
      if (this._stop || this._paused) {
        break
      }
      this.moveProgress(percent, index)
      percent++
    }
  }

  moveProgress(percent: number, index: number) {
    const progressBarActive = this.controller.querySelector('.progress .item.active')
    if (progressBarActive) progressBarActive.classList.remove('acitve')
    const progressBar = this.controller.querySelectorAll('.progress .item')[index]
    progressBar.classList.add('active')
    const inner = progressBar.getElementsByTagName('div')[0]
    progressBar.classList.remove('transition')
    inner.style.width = `${percent}%`
    if (percent === 100) {
      progressBar.classList.add('transition')
      inner.style.width = '0%'
    }
  }

  createPrev(): HTMLElement {
    const div = document.createElement('div')
    div.classList.add('prev')
    if (typeof this.options.prev === 'string') {
      div.innerHTML = this.options.prev
    } else {
      div.innerText = '←'
    }
    return this.controller.appendChild(div)
  }

  createNext(): HTMLElement {
    const div = document.createElement('div')
    div.classList.add('next')
    if (typeof this.options.next === 'string') {
      div.innerHTML = this.options.next
    } else {
      div.innerText = '→'
    }
    return this.controller.appendChild(div)
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
