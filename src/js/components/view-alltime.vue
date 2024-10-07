<script>
  import { mapActions, mapState } from 'vuex';

  import logo from '../../files/logo.png';
  import logoDark from '../../files/logo-dark.png';

  export default {
    computed: {
      ...mapState({
        isLoaded: state => state.alltime.isLoaded,
        value: state => state.alltime?.data?.value 
                        ? (state.alltime.data.value / 1e12).toFixed(2) 
                        : null, // Fallback if no data is present
        count: state => state.alltime?.data?.count || null, // Fallback if count is not available
        damage: state => state.alltime?.data?.damage 
                          ? (state.alltime.data.damage / 1e9).toFixed(2) 
                          : null, // Fallback if no damage data
        darkMode: state => state.user.settings.darkMode,
      }),
      _logo() {
        return this.darkMode ? logoDark : logo; // Choose logo based on dark mode
      }
    },
    methods: {
      ...mapActions(['loadAlltimeFast']),
    },
    created() {
      if (!this.isLoaded) {
        this.loadAlltimeFast(); // Load all-time stats if not already loaded
      }
    },
  }
</script>

<template>
  <div class="alltime-wrap my-3">
    <img :src="_logo" class="alltime-logo img-fluid" alt="Wingspan Delivery Services logo">
    <div class="alltime-border"></div>
    <div id="alltime-data">
      <div v-if="value">
        <strong>{{ value }}T ISK</strong> estimate
      </div>
      <div v-if="count">
        <strong>{{ count }}</strong> deliveries
      </div>
      <div v-if="damage">
        <strong>{{ damage }}B <abbr title="Customer's Resistance Points">CRP</abbr></strong> dealt with
      </div>
    </div>
  </div>
</template>


<style lang="scss">
  @import 'node_modules/bootstrap/scss/functions'; // Import Bootstrap functions
  @import 'node_modules/bootstrap/scss/variables'; // Import Bootstrap variables
  @import 'node_modules/bootstrap/scss/mixins';    // Import Bootstrap mixins for responsive breakpoints

  // Import your custom variables (adjust the path based on your project)
  @import '/src/sass/variables';

  .alltime-wrap {
    display: grid;
    grid-template-columns: minmax(min-content, 340px) 0.5em auto;
    justify-content: center;
    align-items: center;
    grid-column-gap: 1em;
  }

  .alltime-border {
    width: 100%;
    height: 100%;
    background: $color-wingspan; // This will now refer to your custom color variable
  }
</style>
