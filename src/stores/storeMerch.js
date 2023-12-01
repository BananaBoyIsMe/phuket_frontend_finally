import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useStoreMerch = defineStore("storeMerch", {
  state: () => ({
    merch: useStorage("merch", ""),
    merchid: useStorage("merchid", ""),
    merchname: useStorage("merchname", ""),
    merchprice: useStorage("merchprice", ""),
    merchimg: useStorage("merchimg", ""),
    merchinstock: useStorage("merchinstock", ""),
    pages: useStorage("pages", ""),
    limit: useStorage("limit", ""),
    offset: useStorage("offset", ""),
    curPage: useStorage("curPage", ""),
  }),
  getters: {
    getAllMerch: (state) => {
      return state.merch;
    },
    getMerchid: (state) => {
      return state.merchid;
    },
    getMerchname: (state) => {
      return state.merchname;
    },
    getMerchprice: (state) => {
      return state.merchprice;
    },
    getMerchimg: (state) => {
      return state.merchimg;
    },
    getMerchinstock: (state) => {
      return state.merchinstock;
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
  },
  actions: {
    clearStorage() {
      this.merchid = "";
      this.merchname = "";
      this.merchprice = "";
      this.merchimg = "";
      this.merchinstock = "";
    },
  },
});
