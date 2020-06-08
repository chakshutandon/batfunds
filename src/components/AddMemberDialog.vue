<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs-12>
            <v-card-title class="headline">Add Member</v-card-title>
          </v-flex>
          <v-flex xs-12>
            <v-card-text>
              Type in a email address or username to add member to group.
            </v-card-text>
          </v-flex>
          <v-flex xs11>
            <v-card-text>
              <v-text-field v-model="username" label="Email/Username" required></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click.native="$emit('close')">
              Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click.native="addMember">
              Submit
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    addMember: function() {
      var params = {group: this.$store.state.currentGroup, username: this.username}
      this.$store.dispatch('CREATE_PAYMENT_FLAG', params)
      this.$emit('close');
    }
  },
  props: [
    'show',
  ],
};
</script>
