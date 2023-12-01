<template>
  <q-page class="padding">
    <q-img
      src="https://www.panorama-destination.com/wp-content/uploads/2019/07/colourful-phuket-town.jpg"
      height="200px"
    >
      <div class="absolute-full text-subtitle2 flex flex-center">
        <h4>🎁 Phuket Merchandise Store 🏷️</h4>
      </div>
    </q-img>
    <div class="row" style="height: 150px; width: 1150px">
      <div
        class="q-pa-sm"
        style="height: 280px; width: 285px"
        v-for="i in 4"
        :key="i"
      >
        <q-card
          class="my-card"
          v-if="id[i - 1] != null && in_stock[i - 1] > 0 && load"
        >
          <img
            :src="img[i - 1]"
            width=""
            style="height: 280px; max-width: 300px"
          />
          <q-card-section>
            <div class="text-h6">{{ name[i - 1] }}</div>
            <div class="text">{{ description[i - 1] }}</div>
            <div class="row">
              <div class="text-h6 text-blue q-mb-md q-mr-md">
                {{ price[i - 1] }}฿
              </div>
              <div class="text-h9 column q-pl-md">
                <div class="text-h9 column q-pl-lg">
                  Rating : {{ Math.round(avg_merch[i - 1] * 100) / 100 }}
                </div>
                <q-rating
                  v-if="avg_merch[i - 1] < 1"
                  v-model="star0"
                  color="blue-3"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                ></q-rating>
                <q-rating
                  v-if="avg_merch[i - 1] >= 1 && avg_merch[i - 1] < 2"
                  v-model="star1"
                  color="blue-3"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                ></q-rating>
                <q-rating
                  v-if="avg_merch[i - 1] >= 2 && avg_merch[i - 1] < 3"
                  v-model="star2"
                  color="blue-3"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                ></q-rating>
                <q-rating
                  v-if="avg_merch[i - 1] >= 3 && avg_merch[i - 1] < 4"
                  v-model="star3"
                  color="blue-3"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                ></q-rating>
                <q-rating
                  v-if="avg_merch[i - 1] >= 4 && avg_merch[i - 1] < 4.8"
                  v-model="star4"
                  color="blue-3"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                ></q-rating>
                <q-rating
                  v-if="avg_merch[i - 1] >= 4.8"
                  v-model="star5"
                  color="blue-3"
                  icon-selected="star"
                  class="q-ml-md"
                  readonly
                ></q-rating>
              </div>
            </div>
            <q-btn
              class=""
              color="black"
              @click="linkkk(id[i - 1])"
              size="10px"
            >
              View details
            </q-btn>
            <q-btn
              class="q-ml-md"
              color="black"
              @click="addOne(id[i - 1])"
              size="10px"
            >
              Add 1 to cart
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- <div class="" style="height: 280px; width: 285px" v-if="id[1] != null">
        <q-card class="my-card" q-pa-xl>
          <img :src="img[1]" style="height: 280px; max-width: 300px" />
          <q-card-section>
            <div class="text-h6">{{ name[1] }}</div>
            <div class="text">{{ description[1] }}</div>
            <div class="text-h6 text-blue">{{ price[1] }}฿</div>
            <q-btn color="black" @click="linkkk(id[1])"> View Details </q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div class="" style="height: 280px; width: 285px" v-if="id[2] != null">
        <q-card class="my-card" q-pa-xl>
          <img :src="img[2]" style="height: 280px; max-width: 300px" />
          <q-card-section>
            <div class="text-h6">{{ name[2] }}</div>
            <div class="text">{{ description[2] }}</div>
            <div class="text-h6 text-blue">{{ price[2] }}฿</div>
            <q-btn color="black" @click="linkkk(id[2])"> View Details </q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div class="" style="height: 280px; width: 285px" v-if="id[3] != null">
        <q-card class="my-card" q-pa-xl>
          <img :src="img[3]" style="height: 280px; max-width: 300px" />
          <q-card-section>
            <div class="text-h6">{{ name[3] }}</div>
            <div class="text">{{ description[3] }}</div>
            <div class="text-h6 text-blue">{{ price[3] }}฿</div>
            <q-btn color="black" @click="linkkk(id[3])"> View Details </q-btn>
          </q-card-section>
        </q-card>
      </div> -->
    </div>

    <!-- <div flex flex-center>
      <q-btn v-for="page in pages" :key="page"> {{ page }}</q-btn>
    </div> -->

    <q-btn @click="test" flat> </q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "../stores/loginUserStore";
import { useStoreMerch } from "../stores/storeMerch";
import { Notify } from "quasar";
import { ref } from "vue";

export default defineComponent({
  name: "MerchPage",
  setup() {
    // const model = [ref()];
    return {
      star0: ref(0),
      star1: ref(1),
      star2: ref(2),
      star3: ref(3),
      star4: ref(4),
      star5: ref(5),
    };
  },
  data() {
    return {
      // star0: null,
      // star1: null,
      // star2: null,
      // star3: null,

      storeLogUser: useLoginUserStore(),
      storeMerch: useStoreMerch(),
      id: [],
      name: [],
      description: [],
      price: [],
      img: [],
      detailed_description: [],
      url: [],
      in_stock: [],
      // pages: 0,
      // offset: 0,
      // limit: 4,

      merch_dash_id: [],
      max_merch: [],
      avg_merch: [],
      min_merch: [],
      count_merch: [],

      load: false,
    };
  },
  methods: {
    getAllMerch() {
      this.$api
        .get("/merch/")
        // .get("/merch/4/0")
        .then((response) => {
          // console.log((this.id = response.data[0].id));
          let pages = 0;
          for (let i = 0; response.data[i] != null; i++) {
            pages++;

            // console.log("JSOJAOS   " + response.data[i].id);
          }
          pages = pages / 4;
          pages = Math.ceil(pages);
          this.storeMerch.pages = pages;
          // console.log(pages);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSomeMerch(limit, offset) {
      this.$api
        .get("/merch/" + limit + "/" + offset)
        // .get("/merch/4/0")
        .then((response) => {
          // console.log((this.id = response.data[0].id));
          for (let i = 0; response.data[i] != null; i++) {
            this.id.push(response.data[i].id);
            this.name.push(response.data[i].name);
            this.description.push(response.data[i].description);
            this.price.push(response.data[i].price);
            this.img.push(response.data[i].img);
            this.detailed_description.push(
              response.data[i].detailed_description
            );
            this.url.push(response.data[i].url);
            this.in_stock.push(response.data[i].in_stock);
            this.getMerchRating(response.data[i].id);
            console.log(response.data[i].id + "KAOS");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMerchRating(id) {
      this.$api
        .get("/dash/4/" + id)
        .then((response) => {
          // console.log((this.id = response.data[0].id));
          this.merch_dash_id.push(this.id[id]);
          this.max_merch.push(response.data[0].max_merch);
          this.avg_merch.push(response.data[0].avg_merch);
          this.min_merch.push(response.data[0].min_merch);
          this.count_merch.push(response.data[0].count_merch);
          // this.star.push(ref(response.data[i].avg_merch));
          // console.log(this.avg_merch + "KAOS");
          if (this.avg_merch == null) this.avg_merch = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    linkkk(id) {
      this.$router.push("/merch/" + id);
    },
    addOne(id) {},
    test() {},
  },
  async beforeMount() {
    if (this.storeMerch.limit == null) this.storeMerch.limit = 4;
    if (this.storeMerch.offset == null) this.storeMerch.offset = 0;
    await this.getSomeMerch(this.storeMerch.limit, this.storeMerch.offset);
    await this.getAllMerch();

    if (this.storeLogUser.getFullname == null) this.$router.push("/");
    if (this.storeLogUser.getFullname == "") this.$router.push("/");

    this.load = true;

    // for (let i = 1 + offset; i <= 4 + offset; i++) this.getMerchRating(i);
    // console.log(this.storeMerch.limit, this.storeMerch.offset);
  },
});
</script>
