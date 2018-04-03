<template>
  <div class="carousel element-slider" :style="'height: ' + height">
    <div v-for="(dir, i) in ['left', 'right']" :key="'ctrl' + i"
         class="slide-control"
         :class="'carousel__' + dir">
      <v-btn @click="dir === 'left' ? prev() : next()"
             class="pa-0" icon>
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
  mounted () {
    setTimeout(() => {
      // @TODO - workaround
      if (!this.inputValue) this.inputValue = this.value || 0
    }, 1000)
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
  .element-slider {
    .slide-item {
      position: absolute;
      left: 0;
      width: 100%;
      max-width: none;
      &.left-outside {
        transform: translateX(-100%)
      }
      &.active {
        transition: all 0.3s;
        transform: translateX(0)
      }
      &.right-outside {
        transform: translateX(200%)
      }
    }
  }
</style>
