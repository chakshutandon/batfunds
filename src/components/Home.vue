<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex align-start xs12>
        <groupDetail></groupDetail>
      </v-flex>
      <speedDial></speedDial>
    </v-layout>
  </v-container>
</template>

<script>
import groupDetail from '@/components/GroupDetail';
import speedDial from '@/components/SpeedDial';

export default {
  data() {
    return {
    };
  },
  components: {
    groupDetail,
    speedDial,
  },
};
</script>

<style scoped>
</style>
