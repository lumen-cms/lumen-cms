<template>
  <div v-once>
    <div>
      <strong>Colors (<a href="https://www.vuetifyjs.com/style/colors" target="_blank">colors</a>)</strong>
      <p>
        'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green',
        'lime',
        'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey', 'white'<br>
        darken-[1-4], lighten-[1-4], accent-[1-4]
        Default is color for background. If you like to change to font color add '--text' for colors or 'text--' for
        color variants
      </p>
    </div>
    <div>
      <strong>Margins / Paddings (<a href="https://www.vuetifyjs.com/layout/spacing"
                                     target="_blank">spacing</a>)</strong>
      <p>
        m => Margin, m[t,r,b,l,x,y][0,1,2,3,4,5]<br>
        p => Padding p[t,r,b,l,x,y][0,1,2,3,4,5]<br>
        top,left,bottom,right,x-axis,y-axis
      </p>
    </div>
    <div>
      <strong>Font sizes (<a href="https://www.vuetifyjs.com/style/typography"
                             target="_blank">font sizes</a>)</strong>
      <p>
        'display-4', 'display-3', 'display-2', 'display-1', 'headline', 'title', 'subheading', 'body-2', 'body-1',
        'caption'
      </p>
    </div>
    <div>
      <strong>Hide elements (<a href="https://www.vuetifyjs.com/layout/display"
                                target="_blank">hide classes</a>)</strong>
      <p>
        'hidden-xs-only', 'hidden-sm-and-down', 'hidden-sm-and-up', 'hidden-md-only', 'hidden-md-and-down',
        'hidden-md-and-up', 'hidden-lg-only', 'hidden-lg-and-down', 'hidden-lg-and-up', 'hidden-xl-only'</p>
    </div>
    <div>
      <strong>Cards (<a href="https://www.vuetifyjs.com/layout/elevation"
                        target="_blank">Card elevations</a>)</strong>
      <p>
        'elevation-0', 'elevation-3', 'elevation-6', 'elevation-9', 'elevation-12', 'elevation-15', 'elevation-18',
        'elevation-21', 'elevation-24'
      </p>
    </div>
    <div>
      <strong>Various</strong>
      <p>
        'content-boxed', 'content-fluid', 'background-transparent' => boxed max-with, fluid no max-width <br>
        'grid-cards-no-gap', 'grid-list-xs', 'grid-list-sm', 'grid-list-md', 'grid-list-lg', 'grid-list-xl',
        'grid-cards-flat', 'grid-cards-centered' <br>
        'responsive-frame', <br>
        'max-width-900', 'max-width-700', 'max-width-auto'
      </p>
    </div>
  </div>
</template>

<script>
  // Static rendered help content
  export default {
    name: 'LcContentEditHelp'
  }
</script>
