<template>
  <div :class="wrapClassNames"
       :style="style">
    <div v-for="(dir, i) in ['left', 'right']" :key="'ctrl' + i"
         class="slide-control"
         :class="'carousel__' + dir">
      <v-btn @click="dir === 'left' ? prev() : next()"
             class="pa-0"
             icon>
        <v-icon v-text="'chevron_' + dir"/>
      </v-btn>
    </div>
    <div class="carousel__controls  slide-control" v-if="!hideBottomBar">
      <v-btn v-for="(item, i) in getItems()" :key="'bottom-ctrl' + i"
             class="carousel__controls__item" icon dark
             :class="{'carousel__controls__item--active': i === inputValue}"
             @click="select(i)">
        <v-icon>fiber_manual_record</v-icon>
      </v-btn>
    </div>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'LcElementSlider',
    data () {
      return {
        inputValue: null
      }
    },
    props: {
      height: {
        type: String,
        default: '500px'
      },
      hideBottomBar: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number,
        default: null
      },
      content: {
        type: Object
      }
    },
    computed: {
      wrapClassNames () {
        let styles = (this.content && this.content.styles) || {}
        let rootClasses = (styles && styles.rootClassNames) || []
        // add specific max-width classes
        rootClasses = rootClasses.map(e => e.includes('max-width-') ? 'slider-' + e : e)
        if (styles.backgroundClassNames) {
          rootClasses = rootClasses.concat(styles.backgroundClassNames)
        }
        if (!(this.content && this.content.properties.sliderFixedBackground)) {
          rootClasses.push('center-child-elements')
        }
        if (!(this.content && this.content.properties.sliderZoomImages)) {
          rootClasses.push('zoom-images')
        }
        return rootClasses.length ? rootClasses.join(' ') + ' carousel lc-element-slider' : 'carousel lc-element-slider'
      },
      style () {
        const height = this.content && this.content.properties && this.content.properties.height
        const style = {
          height: height ? `${height}px` : this.height
        }
        return style
      }
    },
    watch: {
      inputValue (v, oldV) {
        this.getItems().forEach((item, i) => {
          const el = item && (item.elm || item.$el)
          if (!(el && el.classList)) return
          el.classList.add('slide-item')
          el.classList[i < v ? 'add' : 'remove']('left-outside')
          el.classList[i === v ? 'add' : 'remove']('active')
          el.classList[i > v ? 'add' : 'remove']('right-outside')
        })
      },
      value (val) {
        this.inputValue = val
      }
    },
    destroyed () {
      if (this.content && this.content.properties && this.content.properties.transparentToolbar) {
        this.$store.dispatch('setCmsJumbotron', false)
      }
    },
    mounted () {
      if (this.content && this.content.properties && this.content.properties.transparentToolbar) {
        this.$store.dispatch('setCmsJumbotron', true)
      }

      setTimeout(() => {
        // @TODO - workaround
        if (!this.inputValue) this.inputValue = this.value || 0
      }, 100)
    },
    updated () {
      if (!this.inputValue) this.inputValue = this.value || 0
    },

    methods: {
      next () {
        this.inputValue = (this.inputValue + 1) % this.getItems().length
      },
      prev () {
        const n = this.getItems().length
        this.inputValue = (this.inputValue + n - 1) % n
      },
      select (v) {
        this.inputValue = v
      },
      getItems () {
        return this.$slots.default || []
      }
    }
  }
</script>

<style lang="stylus">

  .lc-element-slider {
    &.center-child-elements {
      .slide-item {
        top: 50%
        &.left-outside {
          transform: translateX(-100%) translateY(-50%)
        }
        &.active {
          transform: translateX(0) translateY(-50%)
        }
        &.right-outside {
          transform: translateX(200%) translateY(-50%)
        }
      }
    }
    &.zoom-images {
      .fixed-background, .jumbotron__wrapper img {
        animation: zoomin 30s ease-in infinite;
        transition: all .5s ease-in-out;
      }
      .jumbotron__wrapper img {
        top:0
        left:0
      }
    }

    &.slider-max-width-900 {
      display block
      max-width: 900px
      margin-left auto !important
      margin-right auto !important
    }
    .slide-item {
      &.card {
        box-shadow: none
      }
      position: absolute;
      left: 0;
      width: 100%;
      max-width: none;
      /*top: 50%*/
      > div {
        margin-bottom 0 !important
      }
      .flex > .card {
        // center non-equal heights of img
        top: 50%
        transform translateY(-50%)
      }
      .content-element {
        background-color transparent !important
      }
      &.left-outside {
        transform: translateX(-100%)
        //transform: translateX(-100%) translateY(-50%)
      }
      &.active {
        transition: all 0.3s;
        transform: translateX(0)
        //transform: translateX(0) translateY(-50%)
      }
      &.right-outside {
        transform: translateX(200%)
        //transform: translateX(200%) translateY(-50%)
      }
    }
  }

</style>
