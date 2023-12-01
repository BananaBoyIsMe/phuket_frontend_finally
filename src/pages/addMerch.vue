<template>
  <q-page class="padding">
    <q-card dark bordered class="bg-grey-2 my-card q-px-md p-py-md q-pa-xl">
      <q-card-section>
        <h5 class="text-black">Merchandise</h5>
        <q-form
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          ref="merchForm"
        >
          <div>
            <q-input
              v-model="name"
              type="text"
              label="this is name"
              lazy-rules
              :rules="[requiredValidate]"
              counter
            />
          </div>
          <div>
            <q-input
              v-model="description"
              type="text"
              label="this is description"
              lazy-rules
              :rules="[requiredValidate]"
              counter
            />
          </div>
          <div>
            <q-input
              v-model="price"
              type="text"
              label="this is price"
              lazy-rules
              :rules="[requiredValidate]"
              counter
            />
          </div>
          <div>
            <q-input
              v-model="img"
              type="text"
              label="this is img"
              lazy-rules
              :rules="[requiredValidate]"
              counter
            />
          </div>
          <div>
            <q-input
              v-model="detailed_description"
              type="text"
              label="this is detailed_description"
              lazy-rules
              :rules="[requiredValidate]"
              counter
            />
          </div>
          <div>
            <q-input
              v-model="in_stock"
              type="text"
              label="this is in_stock"
              lazy-rules
              :rules="[requiredValidate]"
              counter
            />
          </div>

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-separator dark inset />
    </q-card>

    <dialog-component
      v-model="showDialog"
      :propDialog="dialog"
    ></dialog-component>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { requiredValidate } from "../utils/validations";
import { Notify } from "quasar";
import DialogComponent from "src/components/DialogComponent.vue";
import { useLoginUserStore } from "../stores/loginUserStore";

export default defineComponent({
  name: "addMerch",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      isAdmin: false,
      name: null,
      description: null,
      price: null,
      img: null,
      detailed_description: null,
      url: null,
      in_stock: null,
    };
  },
  methods: {
    requiredValidate,
    validateAdmin() {
      if (this.storeLogUser.getUserid == 4) return true;
      else this.$router.push("/user");
    },
    onReset() {
      this.name = null;
      this.description = null;
      this.price = null;
      this.img = null;
      this.detailed_description = null;
      this.url = null;
      this.in_stock = null;
    },
    onSubmit() {
      const data = {
        name: this.name,
        description: this.description,
        price: this.price,
        img: this.img,
        detailed_description: this.detailed_description,
        url: this.url,
        in_stock: this.in_stock,
      };
      // console.log(JSON.stringify(data));
      this.$api
        .post("/merch/upload", data)
        .then((response) => {
          this.onReset();
          this.$refs.merchForm.reset();
        })
        .catch((err) => {
          console.log(err);
          this.showErrorDialog(err);
        });
    },
  },
  beforeMount() {
    if (this.storeLogUser.getUserid != 4) this.$router.push("/");
  },
});
</script>
