import Msite from '@/views/Msite'
import Search from '@/views/Search'
import Order from '@/views/Order'
import Profile from '@/views/Profile'
import Login from '@/views/Login'
import UserInfo from '@/views/UserInfo'
import Shop from '@/views/Shop'
import ShopGoods from '@/views/Shop/ShopGoods'
import ShopRating from '@/views/Shop/ShopRating'
import ShopInfo from '@/views/Shop/ShopInfo'

export default [
  {path: '/msite', component: Msite, meta:{showFooter: true}},
  {path: '/search', component: Search, meta:{showFooter: true}},
  {path: '/order', component: Order, meta:{showFooter: true}},
  {path: '/profile', component: Profile, meta:{showFooter: true}},
  {path: '/login', component: Login}, // meta的值默认是false
  {path: '/userinfo', component: UserInfo}, 
  {path: '/', redirect: '/msite'},
  {
    path: '/shop',
    component: Shop,
    children: [
      {path: '/shop/goods', component: ShopGoods},
      {path: '/shop/rating', component: ShopRating},
      {path: '/shop/info', component: ShopInfo},
      {path: '', redirect: '/shop/goods'}
    ]
  }
]
