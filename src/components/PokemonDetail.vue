<template>
  <div v-if="pokemon">
    <h2>{{ pokemon.frenchName }}</h2>
    <img :src="pokemon.image" width="150" />

    <p><strong>ID :</strong> {{ pokemon.id }}</p>
    <p><strong>Nom anglais :</strong> {{ pokemon.name }}</p>
    <p><strong>Type(s) :</strong> {{ pokemon.types.join(', ') }}</p>
    <p><strong>Taille :</strong> {{ pokemon.height }} m</p>
    <p><strong>Poids :</strong> {{ pokemon.weight }} kg</p>
    <p><strong>Capacités :</strong> {{ pokemon.abilities.join(', ') }}</p>

    <router-link to="/">← Retour</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

// pour utiliser le router et avoir acces aux params
const route = useRoute()
// ref : valeur reactive comme avec Quarkus, angular, etc
const pokemon = ref(null)

// avec un store on recupère les valeurs dans le store direct, pas appel api
async function loadPokemon(id) {
  const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const detail = await detailRes.json()

  const callNomFr = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  const nomFr = await callNomFr.json()
  const frNameObj = nomFr.names.find(n => n.language.name === "fr")

  pokemon.value = {
    id,
    name: detail.name,
    frenchName: frNameObj ? frNameObj.name : detail.name,
    image: detail.sprites.other["official-artwork"].front_default,
    types: detail.types.map(t => t.type.name),
    height: detail.height / 10,
    weight: detail.weight / 10,
    abilities: detail.abilities.map(a => a.ability.name)
  }
}

onMounted(() => {
  loadPokemon(route.params.id)
})
</script>
