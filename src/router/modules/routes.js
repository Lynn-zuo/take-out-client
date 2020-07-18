import Msite from '@/views/Msite'
import Search from '@/views/Search'
import Order from '@/views/Order'
import Profile from '@/views/Profile'

export default [
  {path: '/msite', component: Msite},
  {path: '/search', component: Search},
  {path: '/order', component: Order},
  {path: '/profile', component: Profile},
  {path: '/', redirect: '/msite'}
]
