<template>
  <q-page class="padding" v-if="load">
    <!-- <div class="col-6"> -->
    <q-img
      src="https://z.cdrst.com/foto/localidad/605d/cover/localidad-2d68.jpg"
      height="200px"
      @click="AttractStore"
    >
      <q-tooltip class="bg-blue-2 text-black shadow-4" :offset="[10, 10]">
        Go back to phuket tourist attractions!
      </q-tooltip>
      <div class="absolute-full text-subtitle2 flex flex-center">
        <h4>🍹 Phuket Tourist Attractions 🏖️</h4>
      </div>
    </q-img>
    <!-- </div> -->
    <!-- <q-card class=""> </q-card> -->
    <div class="q-pa-md flex flex-center">
      <!-- <div class="col-3 q-pa-xl">
        <q-img class="" :src="img" width="400px" height="400px"></q-img>
      </div> -->

      <div class="q-ml-lg q-mt-md flex flex-center">
        <div class="q-pa-md">
          <q-img class="" :src="img" width="400px" height="400px"></q-img>
        </div>
        <div class="q-pa-md">
          <q-card class="my-card">
            <q-card-section>
              <q-card-section class="q-pa-md">
                <div class="text-h6 q-pl-xl q-pr-xl q-pb-md text-center">
                  {{ name }}
                </div>
                <q-separator color="green-3" inset size="3px" />
                <q-card-section class="q-pt-none">
                  <div class="text q-my-md" size="20px">
                    {{ detailed_description }}
                  </div>
                </q-card-section>
                <div class="text q-ml-md">
                  Rating: {{ Math.round(avg_attract * 100) / 100 }}
                </div>
                <div class="text q-ml-md">Things to do: {{ things_to_do }}</div>
                <div class="q-ml-md">
                  Location: {{ address }} {{ road }} {{ subdistrict }}
                  {{ district }} {{ province }} {{ postal_code }}
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="Row" style="height: 150px; width: 1150px">
      <div class="q-pa-md">
        <q-card>
          <q-card-section class="q-pa-md">
            <div class="text-h6 q-pl-xl q-pr-xl q-pt-lg q-pb-md text-center">
              Your review
            </div>
            <q-separator color="green-3" inset size="3px" />
            <div class="q-pl-xl q-pr-xl q-pt-lg q-pb-md column">
              <div class="">
                <q-input
                  v-model="rating"
                  label="Your rating (0-5)"
                  counter
                  :rules="[
                    (val) => !!val || 'Require input',
                    (val) =>
                      (val <= 5 && val >= 0) || 'Please rate in between 0-5',
                  ]"
                  lazy-rules
                  ><template v-slot:after>
                    <div class="q-pa-sm">
                      <q-btn @click="onSubmit()" icon="send" />
                    </div> </template
                ></q-input>
              </div>
              <div>
                <q-input
                  v-model="comment"
                  label="Write your comment"
                  counter
                  :rules="[
                    (val) =>
                      val.length < 200 ||
                      'Please write less than 200 characters',
                  ]"
                  lazy-rules
                >
                  <template v-slot:after>
                    <div class="q-pa-sm">
                      <q-btn
                        @click="onFindDelete(storeLogUser.getUserid)"
                        icon="delete"
                      />
                    </div>
                  </template>
                </q-input>
              </div>
              <!-- <q-input v-model="comment" label="Write your comment"></q-input> -->
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-pa-md">
        <!-- Data completed -->
        <q-table
          title="List of reviews"
          :columns="columns"
          :rows="rows"
          row-key="r_id"
          :pagination="paginations"
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td key="r_id" :props="props"> {{ props.row.r_id }}</q-td>
              <q-td key="username" :props="props">
                {{ props.row.username }}</q-td
              >
              <q-td key="rating" :props="props"> {{ props.row.rating }}</q-td>
              <q-td key="comment" :props="props"> {{ props.row.comment }}</q-td>
              <q-td key="time" :props="props"> {{ props.row.time }}</q-td>
              <q-td key="action" v-if="storeLogUser.getUserid == 4">
                <q-btn
                  color="primary"
                  flat
                  round
                  icon="delete"
                  @click="onDelete(props.row)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "../stores/loginUserStore";
import { useStoreAttract } from "src/stores/storeAttract";
import { Notify } from "quasar";
import { requiredValidate } from "../utils/validations";

export default defineComponent({
  name: "AttractDetailPage",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      storeAttract: useStoreAttract(),

      rows: [],
      columns: [
        {
          name: "r_id",
          label: "R_ID",
          field: "r_id",
          align: "left",
          sortable: true,
        },
        {
          name: "username",
          label: "Username",
          field: "username",
          align: "left",
          sortable: true,
        },
        {
          name: "rating",
          label: "Rating",
          field: "rating",
          align: "left",
          sortable: true,
        },
        {
          name: "comment",
          label: "Comment",
          field: "comment",
          align: "left",
          sortable: true,
        },
        {
          name: "time",
          label: "Time",
          field: "time",
          align: "left",
          sortable: true,
        },
        { name: "action", label: "Actions", field: "action", align: "left" },
      ],
      paginations: { rowsPerPage: 7 },

      id: null,
      name: null,
      description: null,
      img: null,
      detailed_description: null,
      things_to_do: null,
      url: null,
      locations_id: null,
      address: null,
      road: null,
      subdistrict: null,
      district: null,
      province: null,
      postal_code: null,

      quantity: null,

      comment: null,
      rating: null,

      avg_attract: null,
      load: false,
    };
  },
  methods: {
    AttractStore() {
      this.$router.push("/attract");
    },
    clearInput() {
      this.comment = null;
      this.rating = null;
    },
    async onSubmit() {
      let j = 1;
      const data1 = {
        comment: this.comment,
        rating: this.rating,
      };
      for (let i = 0; this.rows[i] != null; i++) {
        if (this.storeLogUser.getUserid == this.rows[i].id) {
          j = 0;
          await this.$api
            .put("/rating/" + this.rows[i].r_id, data1)
            .then((response) => {
              this.getAllRating();
              this.getAttractRating();
            })
            .catch((err) => {
              console.log(err);
              this.showErrorDialog(err);
            });
        }
      }
      if (j == 0) {
        this.rating = null;
        this.comment = null;
        return;
      }
      const data2 = {
        rating: this.rating,
        comment: this.comment,
        users_id: this.storeLogUser.getUserid,
        att_id: this.$route.path.charAt(9),
        merch_id: null,
      };
      this.$api
        .post("/rating/upload", data2)
        .then((res) => {
          if (res.status == 200) {
            this.getAllRating();
            this.getAttractRating();
          }
        })
        .catch((err) => {
          console.log(err);
          this.showErrDialog(err);
        });
      this.rating = null;
      this.comment = null;
    },
    onFindDelete(users_id) {
      for (let i = 0; this.rows[i] != null; i++) {
        if (users_id == this.rows[i].id) {
          this.$api
            .delete("/rating/" + this.rows[i].r_id)
            .then((res) => {
              if (res.status == 200) {
                Notify.create({
                  type: "positive",
                  message: "Deleted rating ID: " + res.data.id,
                });
                this.getAllRating();
                this.getAttractRating();
              }
            })
            .catch((err) => {
              console.log(err);
              this.showErrDialog(err);
            });
        }
        this.rating = null;
        this.comment = null;
      }
    },
    onDelete(row) {
      // clearInput();
      this.$api
        .delete("/rating/" + row.r_id)
        .then((res) => {
          if (res.status == 200) {
            Notify.create({
              type: "positive",
              message: "Deleted rating ID: " + res.data.id,
            });
            this.getAllRating();
            this.getAttractRating();
          }
        })
        .catch((err) => {
          console.log(err);
          this.showErrDialog(err);
        });
    },
    getAllRating() {
      this.$api
        .get("/rating/0/" + this.$route.path.charAt(9))
        .then((res) => {
          if (res.status == 200) {
            this.rows = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneAttract() {
      this.$api
        .get(this.$route.path)
        .then((response) => {
          this.id = response.data[0].id;
          this.name = response.data[0].name;
          this.description = response.data[0].description;
          this.img = response.data[0].img;
          this.detailed_description = response.data[0].detailed_description;
          this.things_to_do = response.data[0].things_to_do;
          this.url = response.data[0].url;
          this.locations_id = response.data[0].locations_id;
          this.address = response.data[0].address;
          this.road = response.data[0].road;
          this.subdistrict = response.data[0].subdistrict;
          this.district = response.data[0].district;
          this.province = response.data[0].province;
          this.postal_code = response.data[0].postal_code;

          if (this.road == null) this.road = "";
          // console.log(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAttractRating() {
      this.$api
        .get("/dash/3/" + this.$route.path.charAt(9))
        .then((response) => {
          this.avg_attract = response.data[0].avg_attract;
          // this.star.push(ref(response.data[i].avg_attract));
          // console.log(this.avg_attract + "KAOS");
          if (response.data[0].avg_attract == null) this.avg_attract = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    plus() {
      if (this.quantity == null) this.quantity = 0;
      this.quantity++;
      if (this.quantity < 0) this.quantity = 0;
    },
    minus() {
      if (this.quantity == null) this.quantity = 0;
      this.quantity--;
      if (this.quantity < 0) this.quantity = 0;
    },
  },
  async beforeMount() {
    await this.getOneAttract();
    await this.getAllRating();
    await this.getAttractRating();
    if (this.storeLogUser.getUserid != 4) this.columns.pop();
    // console.log(this.storeLogUser.getUserid + "HIIHIHIHI");
    // console.log(this.storeLogUser.getUserid);
    this.load = true;
    if (this.storeLogUser.getFullname == null) this.$router.push("/");
    if (this.storeLogUser.getFullname == "") this.$router.push("/");
  },
});
</script>
