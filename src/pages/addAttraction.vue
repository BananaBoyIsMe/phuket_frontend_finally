<template>
  <q-page class="padding">
    <q-card dark bordered class="bg-grey-2 my-card q-px-md p-py-md q-pa-xl">
      <q-card-section>
        <h5 class="text-black">Attraction</h5>
        <q-form
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          ref="attractForm"
        >
          <div>
            <q-input
              v-model="name"
              type="text"
              label="this is name"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="description"
              type="text"
              label="this is description"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="img"
              type="text"
              label="this is img"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="detailed_description"
              type="text"
              label="this is detailed_description"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="things_to_do"
              type="text"
              label="this is things to do"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>

          <h5 class="text-black">Address</h5>
          <div>
            <q-input
              v-model="address"
              type="text"
              label="this is address"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input v-model="road" type="text" label="this is road" counter />
          </div>
          <div>
            <q-input
              v-model="subdistrict"
              type="text"
              label="this is subdistrict"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="district"
              type="text"
              label="this is district"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="province"
              type="text"
              label="this is province"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>
          <div>
            <q-input
              v-model="postal_code"
              type="number"
              label="this is postal_code"
              counter
              lazy-rules
              :rules="[requiredValidate]"
            />
          </div>

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              counter
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-btn @click="test()">Test</q-btn>

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
import router from "src/router";

export default defineComponent({
  name: "addAttraction",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      isAdmin: false,
      name: null,
      description: null,
      img: null,
      detailed_description: null,
      things_to_do: null,
      url: null,
      free_lo_id: null,
      address: null,
      road: null,
      subdistrict: null,
      district: null,
      province: null,
      postal_code: null,
      emp: 1,
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
      this.img = null;
      this.detailed_description = null;
      this.things_to_do = null;
      this.url = null;
      this.address = null;
      this.road = null;
      this.subdistrict = null;
      this.district = null;
      this.province = null;
      this.postal_code = null;
    },
    emptyId() {
      let i = 0;
      this.$api
        .get("/location")
        .then((response) => {
          for (
            i;
            response.data[i] != null && response.data[i].id == this.emp;
            i++
          ) {
            console.log(response.data[i].id, this.emp);
            this.emp = this.emp + 1;
          }
        })
        .catch((err) => {
          console.log(err);
          this.showErrorDialog(err);
        });
    },
    onSubmit() {
      const attData = {
        name: this.name,
        description: this.description,
        img: this.img,
        things_to_do: this.things_to_do,
        detailed_description: this.detailed_description,
        url: "-",
        locations_id: this.emp,
      };
      const loData = {
        id: this.emp,
        address: this.address,
        road: this.road,
        subdistrict: this.subdistrict,
        district: this.district,
        province: this.province,
        postal_code: this.postal_code,
      };
      // console.log(JSON.stringify(data));
      this.$api
        .post("/attract/upload", attData)
        .then((response) => {
          this.onReset();
          this.$refs.attractForm.reset();
        })
        .catch((err) => {
          console.log(err);
          this.showErrorDialog(err);
        });

      this.$api
        .post("/location/upload", loData)
        .then((response) => {
          this.onReset();
          this.$refs.attractForm.reset();
        })
        .catch((err) => {
          console.log(err);
          this.showErrorDialog(err);
        });
      this.$router.push("/attract");
    },
    test() {},
  },
  beforeMount() {
    this.emptyId();
    if (this.storeLogUser.getUserid != 4) this.$router.push("/");
  },
});
</script>
