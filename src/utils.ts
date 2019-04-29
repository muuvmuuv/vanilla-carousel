export function timer(ms: number): Promise<any> {
  return new Promise(r => setTimeout(r, ms))
}
