<template>
  <div>
    <v-list>
      <v-subheader>
        Groups
        <v-btn flat small fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-subheader>

      <groupNavigationItem
        v-for="group in groups"
        v-bind:key="group.name"
        :groupName="group.name"
        :showBadge="group.isBadgeVisable"></groupNavigationItem>
    </v-list>
  </div>
</template>

<script>
import groupNavigationItem from '@/components/GroupNavigationItem';

export default {
  methods: {
  },
  data() {
    return {
      groups: [
        { name: 'Group 1', isBadgeVisable: true },
        { name: 'Group 2', isBadgeVisable: false },
        { name: 'Group 3', isBadgeVisable: true },
        { name: 'Group 4', isBadgeVisable: false },
        { name: 'Group 5', isBadgeVisable: false },
        { name: 'Group 6', isBadgeVisable: false },
      ],
    };
  },
  components: {
    groupNavigationItem,
  },
};
</script>

<style scoped>
</style>
