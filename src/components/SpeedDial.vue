<template>
  <div>
    <v-speed-dial
      v-model="fab"
      fixed
      :bottom=true
      :right=true
      :direction=top
      :open-on-hover=true>
      <v-btn
        slot="activator"
        color="indigo"
        fab
        dark
        hover
        v-model="fab">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="green"
        @click.native.stop="showAddMemberDialog = true">
        <v-icon>person_add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="orange"
        @click.native.stop="showRaisePaymentDialog = true">
        <v-icon>flag</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        color="red"
        @click.native.stop="showExitDialog = true">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-speed-dial>
    <addMemberDialog
      @close="showAddMemberDialog = false"
      :show="showAddMemberDialog">
    </addMemberDialog>
    <raisePaymentDialog
      @close="showRaisePaymentDialog = false"
      :show="showRaisePaymentDialog">
    </raisePaymentDialog>
    <exitGroupDialog
      @close="showExitDialog = false"
      :show="showExitDialog">
    </exitGroupDialog>
  </div>
</template>

<script>
import addMemberDialog from '@/components/AddMemberDialog';
import raisePaymentDialog from '@/components/RaisePaymentDialog';
import exitGroupDialog from '@/components/ExitGroupDialog';

export default {
  data() {
    return {
      showAddMemberDialog: false,
      showRaisePaymentDialog: false,
      showExitDialog: false,
    };
  },
  props: [
  ],
  components: {
    addMemberDialog,
    raisePaymentDialog,
    exitGroupDialog,
  },
};
</script>
