<template>
  <div>
  <h1 class="title">Group 1</h1>
  <h3 class="caption mt-2">A short and sweet group description goes here.</h3>

  <personChip v-for="user in users" :key="user.name" class="mt-4 mb-3 mr-3"></personChip>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1">

  </v-data-table>
  </div>
</template>

<script>
import personChip from '@/components/PersonChip';

export default {
  data() {
    return {
      users: [
        { name: 'Yugant' },
        { name: 'Neel' },
        { name: 'Chakshu' },
      ],
      headers: [
        { text: 'Requested By', align: 'left', value: 'name', sortable: false },
        { text: 'Amount' },
        { text: 'Recurring' },
        { text: 'Actions', sortable: false },
      ],
      items: [
        {},
      ],
    };
  },
  components: {
    personChip,
  },
};
</script>

<style scoped>
</style>
