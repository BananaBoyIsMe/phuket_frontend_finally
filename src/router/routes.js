//   .put("/auth/" + this.input.id, data, { headers })
//   .then((res) => {
//     if (res.status == 200) {
//       Notify.create({
//         type: "positive",
//         message: "Updated user ID: " + res.data.id,
//       });
//       if (this.storeLogUser.userid == res.data.id) {
//         this.storeLogUser.fullname = res.data.fullname;
//         if (res.data.img != null && this.updateFile == null) {
//           this.storeLogUser.avatar = this.$RESTAPI + "/file/" + res.data.img;
//         } else {
//           this.storeLogUser.avatar = "default-avatar.png";
//         }
//       }
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     this.showErrDialog(err);
//   });
// let allMerch = this.$api
//   .get("/merch/")
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((err) => {
//     console.log(err);
//   });

let c = [
  { path: "", component: () => import("pages/LoginPage.vue") },
  { path: "/register", component: () => import("pages/RegisterPage.vue") },
  { path: "/user", component: () => import("pages/ListUserPage.vue") },
  { path: "/admin", component: () => import("pages/AdminPage.vue") },
  { path: "/admin/addMerch", component: () => import("pages/addMerch.vue") },
  {
    path: "/admin/addAttract",
    component: () => import("pages/addAttraction.vue"),
  },
  { path: "/merch", component: () => import("pages/MerchPage.vue") },
  { path: "/attract", component: () => import("pages/AttractPage.vue") },
  { path: "/dash", component: () => import("pages/DashPage.vue") },
];

for (let id = 1; id <= 500; id++) {
  c.push({
    path: "/merch/" + id,
    component: () => import("pages/MerchDetailPage.vue"),
  });
}

for (let id = 1; id <= 500; id++) {
  c.push({
    path: "/attract/" + id,
    component: () => import("pages/AttractDetailPage.vue"),
  });
}

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: c,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
