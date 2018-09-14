/**
 *
 * @returns {{number, number}}
 */
export default () => {
  const def = {vw: 1280, vh: 768}
  if (process.server) return def

  /** @type {number} */
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  /** @type {number} */
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  return {vh, vw}
}
