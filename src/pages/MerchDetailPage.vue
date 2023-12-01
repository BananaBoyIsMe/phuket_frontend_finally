<template>
  <q-page class="padding" v-if="load">
    <!-- <div class="col-6"> -->
    <q-img
      src="https://www.panorama-destination.com/wp-content/uploads/2019/07/colourful-phuket-town.jpg"
      height="200px"
      @click="MerchStore"
    >
      <q-tooltip class="bg-blue-2 text-black shadow-4" :offset="[10, 10]">
        Go back to phuket merchandise store!
      </q-tooltip>
      <div class="absolute-full text-subtitle2 flex flex-center">
        <h4>🎁 Phuket Merchandise Store 🏷️</h4>
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
              <!-- <div class="col q-pa-md">
              <q-img class="" :src="img" width="400px" height="400px"></q-img>
            </div> -->
              <q-card-section class="q-pa-md">
                <div class="text-h6 q-pl-xl q-pr-xl q-pb-md text-center">
                  {{ name }}
                </div>
                <q-separator color="green-3" inset size="3px" />
                <!-- <div class="text q-my-md">{{ detailed_description }}</div> -->
                <q-card-section class="q-pt-none">
                  <div class="text q-my-md">{{ detailed_description }}</div>
                </q-card-section>
                <div class="text-h6">In stock: {{ in_stock }} unit</div>
                <div class="text-h6">
                  Total rating: {{ Math.round(avg_merch * 100) / 100 }}
                </div>
                <div class="text-h6 text-blue q-my-md">{{ price }}฿</div>
                <div class="text-h9">Quantity</div>
                <div class="q-mt-sm q-mb-md">
                  <q-input
                    class="text-h6"
                    inputClass="text-center"
                    v-model="quantity"
                    label="amount you want to buy"
                    dense
                    :rules="[
                      (val) => val >= 0 || 'This can not be less than 0',
                    ]"
                  >
                    <template v-slot:before>
                      <q-btn @click="plus()" icon="add" />
                    </template>

                    <template v-slot:after>
                      <q-btn @click="minus()" icon="remove" />
                    </template>
                  </q-input>
                </div>
                <div class="">
                  <q-btn color="black" @click="linkkk(id)" icon="shopping_cart">
                    Add to cart
                  </q-btn>
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
import { useStoreMerch } from "src/stores/storeMerch";
import { Notify } from "quasar";
import { requiredValidate } from "../utils/validations";

export default defineComponent({
  name: "MerchDetailPage",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      storeMerch: useStoreMerch(),

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
      price: null,
      img: null,
      detailed_description: null,
      url: null,
      in_stock: null,

      quantity: null,

      comment: null,
      rating: null,

      avg_merch: null,
      load: false,
    };
  },
  methods: {
    MerchStore() {
      this.$router.push("/merch");
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
          // console.log("HIHIHIHIHIHIHIIHIH");
          j = 0;
          await this.$api
            .put("/rating/" + this.rows[i].r_id, data1)
            .then((response) => {
              this.getAllRating();
              this.getMerchRating();
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
        att_id: null,
        merch_id: this.$route.path.charAt(7),
      };
      this.$api
        .post("/rating/upload", data2)
        .then((res) => {
          if (res.status == 200) {
            this.getAllRating();
            this.getMerchRating();
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
                this.getMerchRating();
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
            this.getMerchRating();
          }
        })
        .catch((err) => {
          console.log(err);
          this.showErrDialog(err);
        });
    },
    getAllRating() {
      this.$api
        .get("/rating/" + this.$route.path.charAt(7) + "/0")
        .then((res) => {
          if (res.status == 200) {
            this.rows = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneMerch() {
      this.$api
        .get(this.$route.path)
        .then((response) => {
          this.id = response.data[0].id;
          this.name = response.data[0].name;
          this.description = response.data[0].description;
          this.price = response.data[0].price;
          this.img = response.data[0].img;
          this.detailed_description = response.data[0].detailed_description;
          this.url = response.data[0].url;
          this.in_stock = response.data[0].in_stock;
          // console.log(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMerchRating() {
      this.$api
        .get("/dash/4/" + this.$route.path.charAt(7))
        .then((response) => {
          this.avg_merch = response.data[0].avg_merch;
          // this.star.push(ref(response.data[i].avg_merch));
          // console.log(this.avg_merch + "KAOS");
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
    if (this.storeLogUser.getFullname == null) this.$router.push("/");
    if (this.storeLogUser.getFullname == "") this.$router.push("/");
    await this.getOneMerch();
    await this.getAllRating();
    await this.getMerchRating();
    this.load = true;
    if (this.storeLogUser.getUserid != 4) this.columns.pop();
    // console.log(this.storeLogUser.getUserid + "HIIHIHIHI");
  },
});
</script>
