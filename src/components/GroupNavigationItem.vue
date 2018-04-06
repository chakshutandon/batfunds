<template>
<v-list-tile avatar @click="defaultAction">
  <v-badge v-model="showBadge" left overlap color="red">
    <v-icon slot="badge" dark small>notifications</v-icon>
    <v-list-tile-avatar>
      <img src="@/assets/logo.png">
    </v-list-tile-avatar>
  </v-badge>
  <v-list-tile-content>
    <v-list-tile-title>{{ groupName }}</v-list-tile-title>
    <v-list-tile-sub-title>John, Alex, Mike, Nick, Tom, Jerry, Martin</v-list-tile-sub-title>
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
    defaultAction() {
      return false;
    },
  },
  props: [
    'groupName',
    'showBadge',
  ],
};
</script>
