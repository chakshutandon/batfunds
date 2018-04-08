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
import { EventBus } from '../event-bus';

export default {
  data: function () {
    return {
      showAddGroupDialog: false,
      groups: [{}],
    };
  },
  mounted: function () {
    this.renderNavigation();
    EventBus.$on('updateNavigation', () => {
      this.renderNavigation();
    });
  },
  methods: {
    renderNavigation: function () {
      this.groups = [];
      axios.get('http://batfunds.herokuapp.com/api/user/groups').then((getUserGroups) => {
        if (getUserGroups.data && getUserGroups.data.success === 1) {
          getUserGroups.data.groups.forEach((group) => {
            axios.get(`http://batfunds.herokuapp.com/api/groups/${group.gid}`).then((getGroupDetails) => {
              if (getGroupDetails.data && getGroupDetails.data.success === 1) {
                this.groups.push(getGroupDetails.data.group);
              }
            });
          });
        }
      });
    },
  },
  components: {
    groupNavigationItem,
    addGroupDialog,
  },
};
</script>
