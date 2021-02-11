<template>
  <div id="content">
    <div class="vignette ship" v-for="ship in allShip" v-bind:key="ship.id">
        <img class="vignette_img" :src="ship.configuration.image_url" style="width: 150px; height: 150px;" />
        <div class="vignette_text">
          <router-link class="link_to_details" :to="{name: 'ship_details', params: {id: ship.id}}">{{ ship.name }}</router-link>
          <span>{{ getAbbrevById(ship.configuration.agency.id) }}</span>
        </div>
    </div>
    <router-view></router-view>
  </div>
  <div id="controllers">
      <button @click="goto('p')">Prev</button>
      <button @click="goto('n')">Next</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router'

export default {
  name: 'Ship',
  data() {
    return {
      allShip: null,
      allAgency: [],
      pos: 0
    }
  },
  methods: {
    /**
     * Retourne l'abbreviation d'une agene selon un id
     * 
     * @param id ID de l'Agence
     */
    getAbbrevById: function(id)
    {
      return this.allAgency[id];
    },
    goto: async function(dir)
    {
      if(dir == "n") this.pos+=30;
      if(dir == "p" && this.pos > 0) this.pos-=30;
      if(this.pos > 0)
      {
        await axios.get(`https://spacelaunchnow.me/api/3.3.0/spacecraft/?limit=30&offset=${this.pos}`).then((response) => {
          this.allShip = response.data.results
        });
        router.push("/ship");
      }
    }
  },
  created: async function (){
    await axios.get(`https://spacelaunchnow.me/api/3.3.0/spacecraft/?limit=30`).then((response) => {
          this.allShip = response.data.results
    });

    this.allShip.forEach(ship => {
      if(ship.image_url == null) this.allShip.splice(this.allShip.indexOf(ship), 1);
    });

    //les abbreviations d'agence pour les vaisseaux ne sont pas précisées dans la reponse de l'API,
    //je créer un tableau avec comme index les id de toutes les agences, avec leur abbreviation comme value
    await axios.get("https://spacelaunchnow.me/api/3.3.0/agencies/?limit=600&ordering=id")
               .then((response)=> {
                  const results = response.data.results;
                  results.forEach(agency => {
                    if(agency.abbrev != null) this.allAgency[agency.id] = agency.abbrev;
                  });
                });
  } 
}
</script>
