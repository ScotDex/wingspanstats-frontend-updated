<script>
  import dayjs from 'dayjs'; // Lighter alternative to 'moment'
  import { EventBus } from '../event-bus';

  export default {
    data() {
      return {
        year: 2014,
        month: '07',
        today: dayjs(), // Initialized with 'dayjs'
      };
    },
    methods: {
      navigate(e) {
        EventBus.$emit('month', {
          year: e.target.dataset.year,
          month: e.target.dataset.month,
        });
        this.removeActive();
        this.addActive(e.target);
        this.scroll(e.target);
      },
      getMonths() {
        return document.getElementsByClassName('month');
      },
      removeActive() {
        const months = this.getMonths();
        for (let month of months) {
          month.classList.remove('active');
        }
      },
      addActive(node) {
        node.classList.add('active');
      },
      scroll(node) {
        const nodeOffset = node.offsetLeft;
        const scrollerWidth = this.$refs.scroller.scrollWidth;
        const timelineWidth = this.$refs.timeline.clientWidth;
        if (nodeOffset > scrollerWidth - timelineWidth / 2) {
          this.$refs.timeline.scrollLeft = scrollerWidth - timelineWidth;
        } else if (nodeOffset < timelineWidth / 2) {
          this.$refs.timeline.scrollLeft = 0;
        } else {
          this.$refs.timeline.scrollLeft = nodeOffset + node.clientWidth / 2 - timelineWidth / 2;
        }
      },
    },
    computed: {
      years() {
        const timestamp = dayjs(`${this.year}-${this.month}`);
        const ret = {};

        do {
          const year = timestamp.year();
          const months = [];
          do {
            months.push(timestamp.clone());
            timestamp.add(1, 'month');
          } while (this.today.isAfter(timestamp) && timestamp.month() !== 0);
          ret[year] = months;
        } while (this.today.isAfter(timestamp));

        return ret;
      },
    },
    mounted() {
      const months = this.getMonths();
      const monthNode = months[months.length - 1];
      this.addActive(monthNode);
      this.scroll(monthNode);
    },
  };
</script>


<template>
  <div class="timeline my-md-3" ref="timeline">
    <div class="scroller" ref="scroller">
      <div v-for="(months, year) in years" class="year px-3">
        <div class="text-center">{{ year }}</div>
        <div class="months-wrap">
          <div
            v-for="month in months"
            @click="navigate"
            class="month py-1 px-3"
            :data-year="month.year()"
            :data-month="month.month() + 1"
          >
            {{ month.format('MMM') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
  @import 'node_modules/bootstrap/scss/functions'; // Import Bootstrap functions first
  @import 'node_modules/bootstrap/scss/variables'; // Import variables for grid breakpoints
  @import 'node_modules/bootstrap/scss/mixins';    // Then import Bootstrap mixins

  .navigation-bar {
    display: grid;
    grid-template-columns: 1fr;

    @include media-breakpoint-up(md) {
      grid-template-columns: 1fr 1fr; // Example breakpoint rule for medium screens
    }
  }

  .nav-item {
    padding: 10px;

    @include media-breakpoint-up(lg) {
      padding: 15px;
    }
  }
</style>
