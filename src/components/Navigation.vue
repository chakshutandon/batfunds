<template>
  <div>
    <v-list>
      <v-subheader>
        Groups
        <v-btn flat small fab
          @click.native.stop="showAddGroupDialog = true">
          <v-icon>add</v-icon>
        </v-btn>
      </v-subheader>

      <addGroupDialog
        @close="showAddGroupDialog = false"
        :show="showAddGroupDialog">
      </addGroupDialog>

      <groupNavigationItem
        v-for="(group, groupIndex) in groups"
        v-bind:key="group.uid"
        v-bind:group="group"></groupNavigationItem>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios';
import addGroupDialog from '@/components/AddGroupDialog';
import groupNavigationItem from '@/components/GroupNavigationItem';

export default {
  data: function () {
    return {
      showAddGroupDialog: false,
    };
  },
  computed: {
    groups() {
      return this.$store.state.groups
    },
  },
  mounted: function() {
    this.$store.dispatch('LOAD_GROUPS')
  },
  components: {
    groupNavigationItem,
    addGroupDialog,
  },
};
</script>
