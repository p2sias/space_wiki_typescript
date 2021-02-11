<template>
<div id="blur"></div>
<div id="detail-box">
    <div v-for="info in renderDetails" v-bind:key="renderDetails.indexOf(info)">
          <img id="detail_img" v-if="info.name == 'Image'" :src="info.value" style="width:100px;height:100px" />
          <span id="detail_title" v-else-if="info.name == 'Titre'" class="detail_title">{{info.value}}</span>
          <span class="detail_info" v-else-if="info.value !== null">{{info.name}} : {{info.value}}</span>
          <span class="detail_null" v-else>{{info.name}} : Inconnu/e</span>
    </div>
    <button class="back_btn" @click="goBack">Back</button>
</div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  inheritAttrs: false,
  name: 'Details',
  data() {
    return {
      //tableau/liste contenant les informations sous forme d'objets
      renderDetails:[],
    }
  },
  methods: {
    //ferme les détails en retournant à la derniere route appelée
    goBack()
    {
      router.go(-1);
    }
  },
  created: async function()
  {
    //on défini la requete selon le type de détail que l'on veut voir
    let qry;
    if(this.$route.name == 'ship_details') qry = `https://spacelaunchnow.me/api/3.3.0/spacecraft/${this.$route.params.id}`;
    if(this.$route.name == 'astro_details') qry = `https://spacelaunchnow.me/api/3.3.0/astronaut/${this.$route.params.id}`;
    if(this.$route.name == 'event_details') qry = `https://spacelaunchnow.me/api/3.3.0/event/${this.$route.params.id}`;
    console.log(qry);
    await axios.get(qry).then((response) => {
        const resData = response.data;
        //pour chaques fenetres de détail, on stocke les informations dans une liste d'objet afin de généraliser les détails malgré la différence de contenu et éviter de 
        //recopier du code dans la template
        if(this.$route.name == 'ship_details')
        {
            this.renderDetails.push({name: "Image", value: resData.spacecraft_config.image_url});
            
            this.renderDetails.push({name: "Agence", value: resData.spacecraft_config.agency.name});
            this.renderDetails.push({name: "Hauteur", value: resData.spacecraft_config.height});
            this.renderDetails.push({name: "Diamètre", value: resData.spacecraft_config.diameter});
            this.renderDetails.push({name: "Utilisation", value: resData.spacecraft_config.capability});
            this.renderDetails.push({name: "Statut", value: resData.status.name});
            this.renderDetails.push({name: "Vols", value: resData.flights.lenght});
            this.renderDetails.push({name: "Description", value: resData.description});
            this.renderDetails.push({name: "Historique", value: resData.spacecraft_config.history});
        } else if(this.$route.name == 'astro_details')
        {
            this.renderDetails.push({name: "Image", value: resData.profile_image_thumbnail});
            this.renderDetails.push({name: "Titre", value: resData.name});
            this.renderDetails.push({name: "Nationalité", value: resData.nationality});
            this.renderDetails.push({name: "Agence", value: resData.agency.name});
            this.renderDetails.push({name: "Naissance", value: resData.date_of_birth});
            this.renderDetails.push({name: "Décès", value: resData.date_of_death});
            this.renderDetails.push({name: "Statut", value: resData.status.name});
            this.renderDetails.push({name: "Vols", value: resData.flights.lenght});
            this.renderDetails.push({name: "Biographie", value: resData.bio});
        } else 
        {
          this.renderDetails.push({name: "Image", value: resData.feature_image});
          this.renderDetails.push({name: "Titre", value: resData.name});
          this.renderDetails.push({name: "Date", value: resData.date});
          this.renderDetails.push({name: "Type", value: resData.type.name});
          this.renderDetails.push({name: "Lieu", value: resData.location});
          this.renderDetails.push({name: "Description", value: resData.description});
        }
    });
  }
}
</script>
