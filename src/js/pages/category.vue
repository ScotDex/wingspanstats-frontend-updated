<script setup>
import LayoutDefault from '../layouts/default.vue';
import ViewCategory from '../components/view-category.vue';

const route = useRoute(); // Vue Router composition API
</script>

<template>
  <LayoutDefault>
    <ViewCategory :category="route.params.category" />
  </LayoutDefault>
</template>
