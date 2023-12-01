<template>
  <q-page class="padding">
    <q-img
      src="https://www.shutterstock.com/image-photo/phuket-thailand-july-13-2018-600nw-1193674174.jpg"
      height="200px"
    >
      <div class="absolute-full text-subtitle2 flex flex-center">
        <h4>📋 Dashboard 📊</h4>
      </div>
    </q-img>

    <div class="row" style="height: 150px; width: 1150px" v-if="load">
      <div class="q-pa-md">
        <q-table
          title="Top ratings for Phuket tourist attractions"
          :columns="att_columns"
          :rows="att_rows"
          row-key="rating"
          :pagination="paginations"
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td key="rating" :props="props">
                {{ Math.round(props.row.rating * 100) / 100 }}</q-td
              >
              <q-td key="num_rating" :props="props">
                {{ props.row.num_rating }}</q-td
              >
              <q-td key="att_id" :props="props"> {{ props.row.att_id }}</q-td>
            </q-tr>
          </template>
        </q-table>
      </div>

      <div class="q-pa-md">
        <q-table
          title="Top ratings for Phuket merchandises"
          :columns="merch_columns"
          :rows="merch_rows"
          row-key="rating"
          :pagination="paginations"
        >
          <template #body="props">
            <q-tr :props="props">
              <q-td key="rating" :props="props">
                {{ Math.round(props.row.rating * 100) / 100 }}</q-td
              >
              <q-td key="num_rating" :props="props">
                {{ props.row.num_rating }}</q-td
              >
              <q-td key="merch_id" :props="props">
                {{ props.row.merch_id }}</q-td
              >
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="q-pa-md q-pl-xl">
        <q-card class="q-pa-md">
          <div class="text-h6">Total number of user: {{ num_user }}</div>
          <q-separator class="q-mt-sm" size="3px" color="green-3"></q-separator>
          <div class="text-center">
            <q-btn
              icon="send"
              class="q-mt-md text-black"
              color="green-3"
              @click="userList()"
            >
              See user list
            </q-btn>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "src/stores/loginUserStore";
export default defineComponent({
  name: "DashPage",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      att_rows: [],
      att_columns: [
        {
          name: "rating",
          label: "Ratings",
          field: "rating",
          align: "left",
          sortable: true,
        },
        {
          name: "num_rating",
          label: "Number of ratings",
          field: "num_rating",
          align: "left",
          sortable: true,
        },
        {
          name: "att_id",
          label: "Att_id",
          field: "att_id",
          align: "left",
          sortable: true,
        },
      ],

      merch_rows: [],
      merch_columns: [
        {
          name: "rating",
          label: "Ratings",
          field: "rating",
          align: "left",
          sortable: true,
        },
        {
          name: "num_rating",
          label: "Number of ratings",
          field: "num_rating",
          align: "left",
          sortable: true,
        },
        {
          name: "merch_id",
          label: "Merch_id",
          field: "merch_id",
          align: "left",
          sortable: true,
        },
      ],
      paginations: { rowsPerPage: 10 },

      // att_rating: [],
      // att_num_rating: [],
      // att_id: [],

      // merch_rating: [],
      // merch_num_rating: [],
      // merch_id: [],

      num_user: 0,
      load: false,
    };
  },
  methods: {
    getTopAttract() {
      this.$api
        .get("/dash/5/0")
        .then((response) => {
          // for (let i = 0; response.data[i] != null; i++) {
          //   this.att_rating.push(response.data[i].rating);
          //   this.att_num_rating.push(response.data[i].num_rating);
          //   this.att_id.push(response.data[i].att_id);
          // }
          this.att_rows = response.data;
          console.log(this.attract_rows);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTopMerch() {
      this.$api
        .get("/dash/6/0")
        .then((response) => {
          // for (let i = 0; response.data[i] != null; i++) {
          //   this.merch_rating.push(response.data[i].rating);
          //   this.merch_num_rating.push(response.data[i].num_rating);
          //   this.merch_id.push(response.data[i].merch_id);
          // }
          this.merch_rows = response.data;
          console.log(this.merch_rows);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNumUser() {
      this.$api
        .get("/dash/")
        .then((response) => {
          // for (let i = 0; response.data[i] != null; i++) {
          //   this.merch_rating.push(response.data[i].rating);
          //   this.merch_num_rating.push(response.data[i].num_rating);
          //   this.merch_id.push(response.data[i].merch_id);
          // }
          this.num_user = response.data[0].num_users;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    userList() {
      this.$router.push("/user");
    },
  },
  async beforeMount() {
    await this.getTopAttract();
    await this.getTopMerch();
    await this.getNumUser();
    this.load = true;

    if (this.storeLogUser.getFullname == null) this.$router.push("/");
    if (this.storeLogUser.getFullname == "") this.$router.push("/");
  },
});
</script>
