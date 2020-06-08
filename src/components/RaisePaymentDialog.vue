<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">Request Payment</v-card-title>
        <v-card-text>
          <v-subheader>Amount</v-subheader>
          <v-layout row>
            <v-flex xs9>
              <v-card-text>
                <v-slider v-model="value" thumb-label step="0.50" max="150" ticks></v-slider>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                v-model="value"
                prefix="$">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-subheader>Who</v-subheader>
          <v-card-text>
            <p class="caption">Leave blank for entire group or add who you wish to request from.</p>
          <v-select
            :items="members"
            v-model="member"
            label="Members"
            autocomplete></v-select>
          </v-card-text>
        </v-card-text>
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
            @click.native="raisepayment">
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
      value: 10,
      recurring: false,
    };
  },
  methods: {
    raisepayment: function () {
      var params = {gid: this.$store.state.currentGroup.gid, amount: this.value}
      this.$store.dispatch('CREATE_PAYMENT_FLAG', params)
      this.$emit('close');
    }
  },
  props: [
    'show',
  ],
};
</script>
