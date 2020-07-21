import Msite from '@/views/Msite'
import Search from '@/views/Search'
import Order from '@/views/Order'
import Profile from '@/views/Profile'
import Login from '@/views/Login'

export default [
  {path: '/msite', component: Msite, meta:{showFooter: true}},
  {path: '/search', component: Search, meta:{showFooter: true}},
  {path: '/order', component: Order, meta:{showFooter: true}},
  {path: '/profile', component: Profile, meta:{showFooter: true}},
  {path: '/login', component: Login}, // meta的值默认是false
  {path: '/', redirect: '/msite'}
]
