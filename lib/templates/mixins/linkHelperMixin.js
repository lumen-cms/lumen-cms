export default {
  methods: {
    /**
     *
     * @param str
     * @returns {boolean}
     */
    isExternal: (str) => (
      (str.indexOf('href="https://') !== -1) || (str.indexOf('href="http://') !== -1) ||
      (str.indexOf('href=\'https://') !== -1) || (str.indexOf('href=\'http://') !== -1)
    ),

    /**
     *
     * @param str
     * @returns {boolean}
     */
    isExternalUrl: (str) => (str.indexOf('https://') !== -1) || (str.indexOf('http://') !== -1),

    /**
     *
     * @param str
     * @returns {boolean}
     */
    hasATag: (str) => str.indexOf('<a') !== -1 // && str.indexOf('href=') !== -1
  }
}
