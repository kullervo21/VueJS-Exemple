import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import PokemonDetail from '../components/PokemonDetail.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/pokemon/:id',
        name: 'PokemonDetail',
        component: PokemonDetail,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
