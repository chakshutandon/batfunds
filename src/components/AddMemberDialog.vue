<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-container grid-list-lg>
        <v-layout row wrap>
              <v-flex xs-12>
                <v-card-title class="headline">Add Member</v-card-title>
              </v-flex>
              <v-flex xs-12>
                <v-card-text>
                  Type in a email address or username to add member to group.
                </v-card-text>
              </v-flex>
              <v-flex xs10 offset-xs1>
                <v-text-field label="Email/Username" required></v-text-field>
              </v-flex>
            </v-layout>
        </v-container>
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
            @click.native="$emit('close')">
              Submit
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: [
    'show',
  ],
};
</script>
