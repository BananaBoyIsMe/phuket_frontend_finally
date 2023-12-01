import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useStoreAttract = defineStore("storeAttract", {
  state: () => ({
    attract: useStorage("attract", ""),
    attractid: useStorage("attractid", ""),
    attractname: useStorage("attractname", ""),
    attractdesc: useStorage("attractdesc", ""),
    attractimg: useStorage("attractimg", ""),
    attractdetail: useStorage("attractdetail", ""),
    attractthings: useStorage("attractthings", ""),
    attracturl: useStorage("attracturl", ""),
    attractlo_id: useStorage("attractlo_id", ""),
    pages: useStorage("pages", ""),
    limit: useStorage("limit", ""),
    offset: useStorage("offset", ""),
    curPage: useStorage("curPage", ""),
  }),
  getters: {
    getAllAttract: (state) => {
      return state.attract;
    },
    getAttractid: (state) => {
      return state.attractid;
    },
    getAttractname: (state) => {
      return state.attractname;
    },
    getAttractdesc: (state) => {
      return state.attractdesc;
    },
    getAttractimg: (state) => {
      return state.attractimg;
    },
    getAttractdetail: (state) => {
      return state.attractdetail;
    },
    getAttractthings: (state) => {
      return state.attractthings;
    },
    getAttracturl: (state) => {
      return state.attracturl;
    },
    getAttractlo_id: (state) => {
      return state.attractlo_id;
    },
    getPages: (state) => {
      return state.pages;
    },
    getLimit: (state) => {
      return state.limit;
    },
    getOffset: (state) => {
      return state.offset;
    },
    getCurPage: (state) => {
      return state.curPage;
    },
  },
  actions: {
    clearStorage() {
      this.attractid = "";
      this.attractname = "";
      this.attractprice = "";
      this.attractimg = "";
      this.attractinstock = "";
    },
  },
});
