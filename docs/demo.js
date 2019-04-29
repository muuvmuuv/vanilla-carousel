;(() => {
  const ele = document.getElementsByClassName('carousel')[0]
  new Carousel(ele, {
    autoplay: 2000,
    prev: true,
    next: true,
    progress: true,
    loop: true,
  })
})()
