<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const store = useStore();

const sso = ref(
  route.hash
    .split('#')[1]
    .split('&')
    .reduce((obj, keyValue) => {
      const [key, value] = keyValue.split('=');
      obj[key] = value;
      return obj;
    }, {})
);

const fetchCharId = async () => {
  try {
    const res = await axios({
      url: 'https://esi.evetech.net/verify/',
      headers: {
        Authorization: `Bearer ${sso.value.access_token}`,
      },
    });
    await store.dispatch('trackUserId', res.data.CharacterID);
    router.push({ name: 'root' });
  } catch (error) {
    console.error('Error fetching Character ID:', error);
  }
};

onMounted(() => {
  fetchCharId();
});
</script>

<template>
  <div class="position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
    Redirecting...
  </div>
</template>
