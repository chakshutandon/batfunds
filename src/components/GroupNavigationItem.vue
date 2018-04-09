<template>
  <v-list-tile avatar @click="updateGroupDetail">
    <v-badge left overlap color="red">
      <v-icon slot="badge" dark small>notifications</v-icon>
      <v-list-tile-avatar>
        <v-icon>group</v-icon>
      </v-list-tile-avatar>
    </v-badge>
    <v-list-tile-content>
      <v-list-tile-title>{{ group.name }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ group.description }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
    updateGroupDetail() {
      this.$store.dispatch('SET_CURRENT_GROUP', this.group)
      this.$store.dispatch('LOAD_MEMBERS', this.group)
    },
  },
  props: [
    'group',
  ],
};
</script>
