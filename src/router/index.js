import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import CreateUser from '../views/users/create-user.vue'
import UserProfile from '../views/users/user-profile.vue'
import CreatePost from '../views/posts/create-post.vue'
import ShowPost from '../views/posts/show-post.vue'
import PostList from '../views/posts/post-list.vue'
import Mapbox from '../views/mapbox/map.vue'
import AddressList from '../views/mapbox/address-list.vue'
import Upload from '../views/images/upload.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

    children: [
      {
        path: '/post-list',
        name: 'post-list',
        component: PostList
      },
      {
        path: '/create-post',
        name: 'create-post',
        component: CreatePost
      },
      {
        path: '/show-post',
        name: 'show-post',
        component: ShowPost
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/create-user',
    name: 'create-user',
    component: CreateUser
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfile
  },
  {
    path: '/map',
    name: 'map',
    component: Mapbox
  },
  {
    path: '/address-list',
    name: 'address-list',
    component: AddressList
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
