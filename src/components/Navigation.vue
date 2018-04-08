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
        :groupDesc="group.description"
        :showBadge="group.isBadgeVisable"></groupNavigationItem>
    </v-list>
    {{httpData}}
  </div>
</template>

<script>
import axios from 'axios';
import groupNavigationItem from '@/components/GroupNavigationItem';

export default {
  methods: {
  },
  data() {
    return {
      groups: [],
    };
  },
  mounted() {
    axios.get('http://batfunds.herokuapp.com/api/user/groups').then((getUserGroups) => {
      if (getUserGroups.data && getUserGroups.data.success === 1) {
        getUserGroups.data.groups.forEach((group) => {
          axios.get(`http://batfunds.herokuapp.com/api/groups/${group.gid}`).then((getGroupDetails) => {
            if (getGroupDetails.data && getGroupDetails.data.success === 1) {
              this.groups.push(getGroupDetails.data.group);
            }
          });
        }, this);
      }
    });
  },
  components: {
    groupNavigationItem,
  },
};
</script>

<style scoped>
</style>
