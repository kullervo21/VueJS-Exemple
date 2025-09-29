<template>
  <div>
    <h1>Liste des Pokémons</h1>
    <table>
      <thead>
      <tr>
        <th>Image</th>
        <th>Nom</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="pokemon in pokemons" :key="pokemon.id">
        <td><img :src="pokemon.image" width="80" /></td>
        <td>{{ pokemon.frenchName }}</td>
        <td>
          <router-link :to="`/pokemon/${pokemon.id}`">
            <button>Voir</button>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      pokemons: []
    }
  },
  mounted() {
    this.fetchPokemons()
  },
  methods: {
    async fetchPokemons() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        const data = await res.json()

        this.pokemons = await Promise.all(
            data.results.map(async (p, index) => {
              const id = index + 1 // wtf la liste commence à 1 ?

              // détails
              const detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
              const detail = await detailRes.json()

              // species pour le nom fr
              const speciesResult = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
              const species = await speciesResult.json()
              const frNameObj = species.names.find(n => n.language.name === "fr")

              return {
                id,
                name: p.name,
                frenchName: frNameObj ? frNameObj.name : p.name,
                image: detail.sprites.other["official-artwork"].front_default
              }
            })
        )
      } catch (e) {
        console.error("Erreur API Pokémon :", e)
      }
    },
    voirPokemon(id) {
      console.log("Voir Pokémon", id)
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}
</style>
