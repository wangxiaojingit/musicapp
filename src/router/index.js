import Vue from 'vue'
import Router from 'vue-router'
import recommond from '@/components/recommond/recommond'
import singer from '@/components/singer/singer'
import rank from '@/components/rank/rank'
import search from '@/components/search/search'
import singerdetile from '@/components/singer-detile/singer-detile'
import disc from '@/components/disc/disc'
import rankDetile from '@/components/rank-detile/rank-detile'
import searchDetile from '@/components/search-detile/search-detile'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/recommond"
    },
    {
      path: '/recommond',
      component: recommond,
      children:[{
        path:':id',
        component:disc
      }]
    },
    {
      path: '/singer',
      component: singer,
      children:[{
        path:':id',
        component:singerdetile
      }]
    },
    {
      path: '/rank',
      component: rank,
      children:[{
        path:':id',
        component:rankDetile
      }]
    },
    {
      path: '/search',
      component: search,
      children:[{
        path:":id",
        component:searchDetile
      }]
    }
  ],
  linkActiveClass:"active"
})
