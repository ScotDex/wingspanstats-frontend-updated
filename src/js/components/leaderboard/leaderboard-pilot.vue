<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import PilotIconWithMedals from '../pilot-icon-with-medals.vue';
  import LeaderboardTicker from '../leaderboard/leaderboard-ticker.vue';

  export default {
    props: ['category', 'pilot', 'listLength'],
    computed: {
      ...mapGetters([
        'getPilotName',
        'hasUser',
      ]),
      placeClass() {
        switch (this.pilot.place) {
          case 1:
            return 'place-gold';
          case 2:
            return 'place-silver';
          case 3:
            return 'place-bronze';
          case 4:
            return 'place-wingspan';
          default:
            return 'place-haxxor';
        }
      },
      size() {
        return this.listLength === 1 ? 'large' : 'small';
      },
      sizeClass() {
        return this.listLength === 1 ? 'place-large' : 'place-small';
      },
      change() {
        if (this.pilot.change === false || this.pilot.change === 0) {
          return '';
        }
        return this.pilot.change;
      },
      glyphClass() {
        if (this.pilot.change > 0) {
          return 'glyphicon glyphicon-chevron-up text-success';
        }
        if (this.pilot.change < 0) {
          return 'glyphicon glyphicon-chevron-down text-danger';
        }
        if (this.pilot.change === 0) {
          return 'glyphicon glyphicon-pause text-muted';
        }
        return 'glyphicon glyphicon-asterisk text-muted';
      },
    },
    components: {
      PilotIconWithMedals,
      LeaderboardTicker,
    },
  };
</script>

<template>
  <div :class="['place', sizeClass]">
    <div :class="['h-100', placeClass]"></div>
    <pilot-icon-with-medals :id="pilot.character_id" :size="size" :category="category"></pilot-icon-with-medals>
    <a class="place-name ml-2">
      <div class="small">
        #{{ pilot.place }} <small><span :class="glyphClass"></span> {{ change }}</small>
      </div>
      {{ getPilotName(pilot.character_id) }}
      <br v-if="size === 'large' || hasUser">
      <span v-if="size === 'small' && !hasUser">–</span>
      <leaderboard-ticker :category="category" :pilot="pilot"></leaderboard-ticker>
    </a>
  </div>
</template>


<style lang="scss">
  @import 'node_modules/bootstrap/scss/functions'; // Import Bootstrap functions first
  @import 'node_modules/bootstrap/scss/variables'; // Import Bootstrap variables
  @import 'node_modules/bootstrap/scss/mixins';    // Import Bootstrap mixins for breakpoints

  // Import your custom variables (adjust the path based on your project)
  @import '/src/sass/variables';

  .place {
    display: grid;
    align-items: center;
    line-height: 1.4;

    &.place-small {
      grid-template-columns: 0.5em 32px auto;
      line-height: 1.2;
    }

    &.place-large {
      grid-template-columns: 0.5em 64px auto;
      min-height: 72px;
    }
  }

  .place-gold {
    background: $color-first;
  }

  .place-silver {
    background: $color-second;
  }

  .place-bronze {
    background: $color-third;
  }

  .place-wingspan {
    background: $color-wingspan;
  }

  .place-haxxor {
    background: lighten($color-first, 30%);
  }
</style>
