<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-flex xs-12>
            <v-card-title class="headline">Add Group</v-card-title>
          </v-flex>
          <v-flex xs-12>
            <v-card-text>
              <span>Please give this group a name and description.</span>
            </v-card-text>
          </v-flex>
            <v-flex xs11>
              <v-card-text>
                <v-form v-model="formValid" ref="form" lazy-validation>
                  <v-text-field
                    label="Group Name"
                    v-model="groupName"
                    :rules="[v => !!v || 'Name is required']"
                    required>
                  </v-text-field>
                  <v-text-field
                    label="Description"
                    multi-line
                    rows=2
                    :rules="[(v) => v.length <= 400 || 'Max 400 characters']"
                    :counter="400"
                    v-model="groupDesc"
                    required>
                  </v-text-field>
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
                      :disabled="!formValid"
                      @click.native="addGroup()">
                        Submit
                    </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      formValid: true,
    };
  },
  methods: {
    addGroup() {
      if (!this.groupName || !this.groupDesc) return;
      this.$store.dispatch('CREATE_GROUP', {name: this.groupName, desc: this.groupDesc})
      this.$emit('close');
    },
  },
  props: [
    'show',
  ],
};
</script>
