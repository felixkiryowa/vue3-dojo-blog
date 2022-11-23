import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from '../components/HelloWorld.vue'
import DetailsComponent from '../components/DetailsComponent.vue'
import store from '../store'
import HomeComponent from '../components/AuthComponents/HomeComponent.vue'
import RegisterComponent from '../components/AuthComponents/RegisterComponent.vue'
import LoginComponent from '../components/AuthComponents/LoginComponent.vue'
import PostsComponent from '../components/AuthComponents/PostsComponent.vue'



const routes = [
   {
      path: '/hello-world',
      name: 'Home',
      component: HelloWorld
   },
   {
      path: '/posts/:id',
      name: 'DetailsComponent',
      component: DetailsComponent,
      props: true // Access a route parameter as a prop
   },
   {
      path: '/',
      name: 'HomeComponent',
      component: HomeComponent
   },
   {
      path: '/register',
      name: "RegisterComponent",
      component: RegisterComponent,
      meta: { guest: true },
   },
   {
      path: '/login',
      name: "LoginComponent",
      component: LoginComponent,
      meta: { guest: true },
   },
   {
      path: '/posts',
      name: 'posts',
      component: PostsComponent,
      meta: { requiresAuth: true },
   }
];


const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes
});


router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters['auth/isAuthenticated']) {
         next()
         return
      }
      next('/login')
   } else {
      next()
   }
})


router.beforeEach((to, from, next) => {
   if (to.matched.some((record) => record.meta.guest)) {
     if (store.getters['auth/isAuthenticated']) {
       next("/posts");
       return;
     }
     next();
   } else {
     next();
   }
 });
 

export default router;