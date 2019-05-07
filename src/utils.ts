export function timer(ms: number): Promise<NodeJS.Timeout> {
  return new Promise(r => setTimeout(r, ms))
}

/**
 * Return state of tab visibility.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 */
export function visibilityChange(cb: (h: boolean) => void) {
  function handleVisibilityChange() {
    if (document.hidden) {
      cb(true)
    } else {
      cb(false)
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange, false)
}
