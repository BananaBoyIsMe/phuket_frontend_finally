<template>
  <q-page class="flex flex-center">
    <q-btn @click="addMerch()" q-pa-xl> Add Merchandise </q-btn>
    <q-btn @click="addAttract()" q-pa-xl> Add Attraction </q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import DialogComponent from "src/components/DialogComponent.vue";
import { useLoginUserStore } from "src/stores/loginUserStore";

export default defineComponent({
  name: "AdminPage",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
    };
  },
  methods: {
    addMerch() {
      this.$router.push("/Admin/addMerch");
    },
    addAttract() {
      this.$router.push("/Admin/addAttract");
    },
  },
  beforeMount() {
    if (this.storeLogUser.getUserid != 4) this.$router.go(-1);
  },
});
</script>
