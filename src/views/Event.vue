<template>
  <div id="content">
    <!-- Pour chaques évènements dans all_event-->
    <div class="vignette event" v-for="event in allEvents" v-bind:key="event.id">
      <img class="vignette_img" v-if="event.feature_image !== null" style="width:200px;height:200px" :src="event.feature_image" />
      <div class="vignette_text">
        <!-- lien vers la route menant aux détails d'un évènement -->
        <router-link class="link_to_details" :to="{name: 'event_details', params: {id: event.id}}">{{event.name}}</router-link>  
      </div>    
    </div>
    <router-view></router-view>
  </div>
  <!-- Boutons de navigation de pages -->
  <div id="controllers">
      <button @click="goto('p')">Prev</button>
      <button @click="goto('n')">Next</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'Event',
  data() {
    return {
      allEvents: null,
      pos: 0
    }
  },
  methods: {
    /**
     * Fonction de navigation
     * 
     * avance de 30 dans la postion dans l'api
     * 
     * @param dir direction
     */
    goto: async function(dir)
    {
      if(dir == "n") this.pos+=30;
      if(dir == "p" && this.pos > 0) this.pos-=30;
      if(this.pos > 0)
      {
        await axios.get(`https://spacelaunchnow.me/api/3.3.0/event/?limit=30&offset=${this.pos}`).then((response) => {
          this.allEvents = response.data.results
        });
        router.push("/events");
      }
    }
  },
  /**
   * Se lance à la création du composant
   */
  created: async function(){
    await axios.get("https://spacelaunchnow.me/api/3.3.0/event/?limit=30&offset=30").then((response) => {
        this.allEvents = response.data.results;
      });

    //Supprime les evenements sans image
    this.allEvents.forEach(event => {
      if(event.image_url == null) this.allEvents.splice(this.allEvents.indexOf(event), 1);
    });
  }
}
</script>
