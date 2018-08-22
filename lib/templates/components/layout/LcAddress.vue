<template>
  <div itemscope
       itemtype="http://schema.org/Organization"
       class="lc-address-box"
       v-if="$cms.company">
    <div itemprop="name">{{ $cms.company.name }}</div>
    <div itemprop="address"
         itemscope
         itemtype="http://schema.org/PostalAddress">
      <div itemprop="streetAddress">{{$cms.company.streetAddress}}</div>
      <div>
        <span itemprop="postalCode">{{$cms.company.postalCode}}</span>
        <span itemprop="addressLocality">{{$cms.company.addressLocality}}</span>
      </div>
    </div>
    <div itemprop="email" v-if="$cms.company.email" v-text="$cms.company.email"/>
    <div v-if="$cms.company.phoneNumbers"
         v-for="(number,i) in $cms.company.phoneNumbers"
         :key="i"
         itemprop="telephone">
      <a :href="'tel:'+number.value">{{number.text}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LcAddress'
  }
</script>
