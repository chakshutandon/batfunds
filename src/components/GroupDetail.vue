<template>
  <div v-if="isVisible">
  <h1 class="title">{{ group.name }}</h1>
  <h3 class="caption mt-2">{{ group.description }}</h3>
  <personChip
    v-for="user in users"
    :key="user.name"
    :person="user"
    class="mt-4 mb-3 mr-3">
  </personChip>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-actions
    class="elevation-1">

  </v-data-table>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';
import personChip from '@/components/PersonChip';

export default {
  data() {
    return {
      isVisible: false,
      group: {},
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
  mounted() {
    EventBus.$on('updateGroupDetail', (group) => {
      if (group) {
        this.isVisible = true;
        this.group = group;
      }
    });
  },
  components: {
    personChip,
  },
};
</script>
