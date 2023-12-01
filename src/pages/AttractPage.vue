<template>
  <q-page class="padding">
    <q-img
      src="https://z.cdrst.com/foto/localidad/605d/cover/localidad-2d68.jpg"
      height="200px"
    >
      <div class="absolute-full text-subtitle2 flex flex-center">
        <h4>🍹 Phuket Tourist Attractions 🏖️</h4>
      </div>
    </q-img>
    <div class="row" style="height: 150px; width: 1150px">
      <div
        class="q-pa-sm"
        style="height: 280px; width: 285px"
        v-for="i in 4"
        :key="i"
      >
        <q-card class="my-card" q-pa-xl v-if="id[i - 1] != null && load">
          <img :src="img[i - 1]" style="height: 280px; width: 380px" />
          <q-card-section>
            <div class="text-h6">{{ name[i - 1] }}</div>
            <div class="text">{{ description[i - 1] }}</div>
            <div class="row">
              <!-- <div class="text-h9 column q-pl-md"> -->
              <div class="text-h9 column q-py-sm">
                Rating : {{ Math.round(avg_attract[i - 1] * 100) / 100 }}
              </div>
              <q-rating
                v-if="avg_attract[i - 1] < 1"
                v-model="star0"
                color="blue-3"
                icon-selected="star"
                class="q-ml-md"
                readonly
                size="20px"
              ></q-rating>
              <q-rating
                v-if="avg_attract[i - 1] >= 1 && avg_attract[i - 1] < 2"
                v-model="star1"
                color="blue-3"
                icon-selected="star"
                class="q-ml-md"
                readonly
                size="20px"
              ></q-rating>
              <q-rating
                v-if="avg_attract[i - 1] >= 2 && avg_attract[i - 1] < 3"
                v-model="star2"
                color="blue-3"
                icon-selected="star"
                class="q-ml-md"
                readonly
                size="20px"
              ></q-rating>
              <q-rating
                v-if="avg_attract[i - 1] >= 3 && avg_attract[i - 1] < 4"
                v-model="star3"
                color="blue-3"
                icon-selected="star"
                class="q-ml-md"
                readonly
                size="20px"
              ></q-rating>
              <q-rating
                v-if="avg_attract[i - 1] >= 4 && avg_attract[i - 1] < 4.8"
                v-model="star4"
                color="blue-3"
                icon-selected="star"
                class="q-ml-md"
                readonly
                size="20px"
              ></q-rating>
              <q-rating
                v-if="avg_attract[i - 1] >= 4.8"
                v-model="star5"
                color="blue-3"
                icon-selected="star"
                class="q-ml-md"
                readonly
                size="20px"
              ></q-rating>
              <!-- </div> -->
            </div>
            <q-btn color="black" @click="linkkk(id[i - 1])">
              View Details
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <!-- <div class="" style="height: 280px; width: 280px" v-if="id[1] != null">
        <q-card class="my-card" q-pa-xl>
          <img :src="img[1]" style="height: 280px; width: 300px" />
          <q-card-section>
            <div class="text-h6">{{ name[1] }}</div>
            <div class="text">{{ description[1] }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="" style="height: 280px; width: 280px" v-if="id[2] != null">
        <q-card class="my-card" q-pa-xl>
          <img :src="img[2]" style="height: 280px; width: 300px" />
          <q-card-section>
            <div class="text-h6">{{ name[2] }}</div>
            <div class="text">{{ description[2] }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="" style="height: 280px; width: 280px" v-if="id[3] != null">
        <q-card class="my-card" q-pa-xl>
          <img :src="img[3]" style="height: 280px; width: 300px" />
          <q-card-section>
            <div class="text-h6">{{ name[3] }}</div>
            <div class="text">{{ description[3] }}</div>
          </q-card-section>
        </q-card>
      </div> -->
    </div>

    <!-- <div flex flex-center>
      <q-btn v-for="page in pages" :key="page"> {{ page }}</q-btn>
    </div> -->

    <!-- <q-btn @click="test" flat> test button </q-btn> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "../stores/loginUserStore";
import { useStoreAttract } from "../stores/storeAttract";
import { Notify } from "quasar";
import { ref } from "vue";

export default defineComponent({
  name: "AttractPage",
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
      storeLogUser: useLoginUserStore(),
      storeAttract: useStoreAttract(),
      id: [],
      name: [],
      description: [],
      img: [],
      detailed_description: [],
      things_to_do: [],
      url: [],
      locations_id: [],
      // pages: 0,
      // offset: 0,
      // limit: 4,

      attract_dash_id: [],
      max_attract: [],
      avg_attract: [],
      min_attract: [],
      count_attract: [],

      load: false,
    };
  },
  methods: {
    getAllAttract() {
      this.$api
        .get("/attract/")
        .then((response) => {
          let pages = 0;
          for (let i = 0; response.data[i] != null; i++) {
            pages++;
            // console.log(response.data[i].id + "   JOJAOSJ");
          }
          pages = pages / 4;
          pages = Math.ceil(pages);
          this.storeAttract.pages = pages;
          // console.log(pages);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSomeAttract(limit, offset) {
      this.$api
        .get("/attract/" + limit + "/" + offset)
        .then((response) => {
          console.log("limit: " + limit + "offset: " + offset);
          for (let i = 0; response.data[i] != null; i++) {
            // console.log(response.data[i]);
            this.id.push(response.data[i].id);
            this.name.push(response.data[i].name);
            this.description.push(response.data[i].description);
            this.img.push(response.data[i].img);
            this.detailed_description.push(
              response.data[i].detailed_description
            );
            this.things_to_do.push(response.data[i].things_to_do);
            this.url.push(response.data[i].url);
            this.locations_id.push(response.data[i].locations_id);

            this.getAttractRating(response.data[i].id);

            // console.log(response.data[i].id + "  kapsk");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAttractRating(id) {
      this.$api
        .get("/dash/3/" + id)
        .then((response) => {
          // console.log((this.id = response.data[0].id));
          this.attract_dash_id.push(this.id[id]);
          this.max_attract.push(response.data[0].max_attract);
          this.avg_attract.push(response.data[0].avg_attract);
          this.min_attract.push(response.data[0].min_attract);
          this.count_attract.push(response.data[0].count_attract);
          // this.star.push(ref(response.data[i].avg_attract));
          // console.log(this.avg_attract + "KAOS");
          if (this.avg_attract == null) this.avg_attract = 0;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    linkkk(id) {
      this.$router.push("/attract/" + id);
    },
    test() {},
  },
  async beforeMount() {
    if (this.storeAttract.limit == null) this.storeAttract.limit = 4;
    if (this.storeAttract.offset == null) this.storeAttract.offset = 0;
    await this.getSomeAttract(
      this.storeAttract.limit,
      this.storeAttract.offset
    );
    await this.getAllAttract();
    // this.storeAttract.curPage = this.storeAttract.getOffset / 4 + 1;
    // console.log(this.storeAttract.curPage);
    // for (let i = 1; i <= 4; i++) this.getAttractRating(i);
    // console.log(this.avg_attract);
    // console.log(
    //   "Hi:::::: ",
    //   this.storeAttract.getLimit,
    //   this.storeAttract.getOffset,
    //   this.storeAttract.curPage
    // );
    this.load = true;
    if (this.storeLogUser.getFullname == null) this.$router.push("/");
    if (this.storeLogUser.getFullname == "") this.$router.push("/");
  },
});
</script>
