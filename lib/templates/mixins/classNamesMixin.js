export default {
  methods: {
    classNameHandler (originClass, classNames, hasBackground) {
      if (hasBackground) {
        originClass['background-transparent'] = true
      }
      if (classNames && Array.isArray(classNames)) {
        classNames.forEach(c => {
          originClass[c] = true
        })
      }
    }
  }
}
