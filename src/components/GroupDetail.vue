<template>
  <div>
  <h1 class="title">{{ currentGroup.name }}</h1>
  <h3 class="caption mt-2">{{ currentGroup.description }}</h3>
  <personChip
    v-for="member in members"
    :key="member.name"
    :person="member"
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
      group: {},

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
  computed: {
    currentGroup() {
      return this.$store.state.currentGroup
    },
    members() {
      return this.$store.state.members
    },
  },
  mounted: function() {
  },
  components: {
    personChip,
  },
};
</script>
