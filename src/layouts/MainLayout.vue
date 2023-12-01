<template>
  <q-layout view="lHh Lpr lFF">
    <q-header elevated class="bg-green-3 text-black">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title><strong>Phuket Tourist Hub</strong></q-toolbar-title>
        <q-space></q-space>
        <div v-if="storeLogUser.getUserid">
          <strong>Hello! {{ storeLogUser.getFullname }} </strong>
          .
        </div>
        <q-btn round v-if="storeLogUser.getUserid" class="q-mr-sm">
          <q-avatar size="32px">
            <img :src="storeLogUser.getAvatar" />
          </q-avatar>
        </q-btn>
        <q-btn dense icon="shopping_cart" class="q-mr-sm"></q-btn>
        <q-avatar class="q-mr-sm" size="30px" color="red" text-color="white">{{
          shopItem
        }}</q-avatar>
        <q-btn dense icon="logout" class="icon-black-2" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-footer elevated class="bg-green-3 text-black" v-if="currentMerch()">
      <q-toolbar>
        <div class="text-h6">
          Current pages: {{ storeMerch1.curPage }}
          <q-btn
            color="white"
            class="text-black"
            v-for="page in storeMerch1.pages"
            :key="page"
            @click="theMerch(page)"
          >
            {{ page }}</q-btn
          >
        </div>
      </q-toolbar>
    </q-footer>

    <q-footer elevated class="bg-green-3 text-black" v-if="currentAttract()">
      <q-toolbar>
        <div class="text-h6">
          Current pages: {{ storeAttract1.curPage }}
          <q-btn
            color="white"
            class="text-black"
            v-for="page in storeAttract1.pages"
            :key="page"
            @click="theAttract(page)"
          >
            {{ page }}</q-btn
          >
        </div>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menus </q-item-label>
        <!-- <div v-if="ifAdmin()"></div> -->
        <EssentialLink
          v-for="link in ifAdmin()"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useLoginUserStore } from "../stores/loginUserStore";
import { useStoreMerch } from "../stores/storeMerch";
import { useStoreAttract } from "../stores/storeAttract";
import { Notify } from "quasar";
const linksList = [
  {
    title: "Account",
    caption: "Account login and register",
    icon: "settings",
    link: "/",
  },
  {
    title: "Attractions",
    caption: "Tourist attractions in Phuket",
    icon: "attractions",
    link: "/attract",
  },
  {
    title: "Merchendises",
    caption: "Authentic Phuket merchandises",
    icon: "shopping_cart",
    link: "/merch",
  },
  {
    title: "Dashboard",
    caption: "Top merchandises, tourist attraction & others",
    icon: "dashboard",
    link: "/dash",
  },
  {
    title: "Admin",
    caption: "Add Attraction/Merchandise",
    icon: "person",
    link: "/admin",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  data() {
    return {
      storeMerch1: useStoreMerch(),
      storeAttract1: useStoreAttract(),
      shopItem: 0,
    };
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const storeLogUser = useLoginUserStore();
    const storeMerch = useStoreMerch();
    const storeAttract = useStoreAttract();

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      storeLogUser,
      pagesMerch: storeMerch.pages,
      pagesAttract: storeAttract.pages,
    };
  },
  methods: {
    logout() {
      this.storeLogUser.clearStorage();
      Notify.create({
        type: "info",
        message: "Logout successfully",
      });
      this.$router.push("/");
    },
    ifAdmin() {
      if (this.storeLogUser.getUserid != 4) this.essentialLinks.splice(4, 1);
      return this.essentialLinks;
    },
    currentMerch() {
      if (this.$route.path == "/merch") return true;
      return false;
    },
    currentAttract() {
      if (this.$route.path == "/attract") return true;
      return false;
    },
    theMerch(page) {
      let offset = (page - 1) * 4;
      this.storeMerch1.offset = offset;
      let limit = 4;
      this.storeMerch1.limit = limit;
      this.$router.go();
    },
    theAttract(page) {
      let offset = (page - 1) * 4;
      this.storeAttract1.offset = offset;
      let limit = 4;
      this.storeAttract1.limit = limit;
      this.$router.go();
    },
  },
  beforeMount() {
    this.storeMerch1.curPage = this.storeMerch1.offset / 4 + 1;
    this.storeAttract1.curPage = this.storeAttract1.offset / 4 + 1;
    // console.log(this.storeAttract1.offset / 3 + 1);
  },
});
</script>
