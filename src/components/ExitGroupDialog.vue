<template>
  <v-dialog v-model="show" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Leave Group?</v-card-title>
      <v-card-text>Do you want to exit this group? This action cannot be undone.</v-card-text>
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
          I Understand
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
