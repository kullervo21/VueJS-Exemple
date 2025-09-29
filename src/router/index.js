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
        // route avec le param id qu'on recupère avec routes.params.id dans les composants
        path: '/pokemon/:id',
        name: 'PokemonDetail',
        component: PokemonDetail,
        //pour passer les params de la route comme props
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
