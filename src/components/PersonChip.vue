<template>
  <v-chip>
    <v-icon>person</v-icon>
    <span class="ml-2">{{ person.username }}</span>
  </v-chip>
</template>

<script>
export default {
  props: [
    'person',
  ],
};
</script>
