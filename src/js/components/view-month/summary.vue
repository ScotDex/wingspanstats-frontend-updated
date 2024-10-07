<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        isLoaded: state => state.month.isLoaded,
        value: state => state.month?.summary?.value ? (state.month.summary.value / 1e9).toFixed(2) : null, // Simplified check
        count: state => state.month?.summary?.count || null,
        average: state => state.month?.summary?.count && state.month?.summary?.value 
                         ? (state.month.summary.value / state.month.summary.count / 1e6).toFixed(2) 
                         : null, // Simplified condition for average
        damage: state => state.month?.summary?.damage ? (state.month.summary.damage / 1e6).toFixed(2) : null // Simplified damage computation
      }),
    },
  }
</script>


<template>
  <div class="summary-month-wrap my-3">
    <div v-if="value">
      <strong>{{ value }}B ISK</strong> estimate
    </div>
    <div class="alltime-border"></div>
    <div v-if="count">
      <strong>{{ count }}</strong> deliveries
    </div>
    <div class="alltime-border"></div>
    <div v-if="average">
      <strong>{{ average }}M ISK</strong> average
    </div>
    <div class="alltime-border"></div>
    <div v-if="damage">
      <strong>{{ damage }}M <abbr title="Customer's Resistance Points">CRP</abbr></strong> dealt with
    </div>
  </div>
</template>


<style lang="scss">
  @import 'node_modules/bootstrap/scss/functions';  // Bootstrap functions first
  @import 'node_modules/bootstrap/scss/variables';  // Bootstrap variables second
  @import 'node_modules/bootstrap/scss/mixins';     // Bootstrap mixins last

  .summary-month-wrap {
    display: grid;
    grid-template-columns: max-content;
    grid-auto-columns: 0.25em max-content;
    justify-content: center;
    align-items: center;
    grid-column-gap: 0.5em;
    grid-auto-flow: row;
    text-align: center;

    @include media-breakpoint-up(md) {
      grid-auto-flow: column;
      text-align: inherit;
    }
  }
</style>
