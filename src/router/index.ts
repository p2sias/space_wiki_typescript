import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
      path: "/",
      name: "astro",
      component: () => import('../views/Astronauts.vue'),
      children: [
          {
              path: "astro/details/:id",
              name: "astro_details",
              component: () => import('../views/Details.vue')
          }
      ]
  },
  {
      path: "/ship",
      name: "ship",
      component: () => import('../views/Ship.vue'),

      children: [
          {
              path: "details/:id",
              name: 'ship_details',
              component: () => import('../views/Details.vue'),
          }
      ],
  }, 
  {
      path: "/events",
      name: "event",
      component: () => import('../views/Event.vue'),
      children: [
          {
              path: "details/:id",
              name: 'event_details',
              component: () => import('../views/Details.vue'),
          }
      ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
