window.onload = function() {
  const ele = document.getElementsByClassName('carousel')[0]
  new VanillaCarousel(ele, {
    autoplay: 2000,
    prev: true,
    next: true,
    progress: true,
    loop: true,
    pauseOnHover: true,
    keyboardNav: true,
  })
}
