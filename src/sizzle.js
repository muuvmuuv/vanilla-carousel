const $ = selector => {
  const element = document.querySelector(selector)
  if (element) return element
  return document.createElement(selector.replace(/[\\.#]?(:.+)?/g, ''))
}

$.all = selector => {
  const elements = document.querySelectorAll(selector)
  if (elements) return elements
  return document.querySelectorAll('empty')
}

export default $
