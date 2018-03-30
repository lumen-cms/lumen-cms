import Vue from 'vue'

import {resolve} from 'path'

import Test from '../components/components/Test.vue'

Vue.component('cms-test', resolve('lib/templates/components/Test'))
