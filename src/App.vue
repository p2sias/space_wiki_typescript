<template>
  <div id="header">
    <router-link class="head_link" :to="{name: 'astro'}">Astronautes</router-link>
    <router-link class="head_link" :to="{name: 'ship'}">Vaisseaux</router-link>
    <router-link class="head_link" :to="{name: 'event'}">Evenements</router-link>
  </div>
  <router-view></router-view>
</template>

<style>
@font-face {
  font-family: varela;
  src: url("/fonts/valera.ttf");
}

*{
  margin: 0;
  padding: 0;
}

#app
{
  display: flex;
  flex-direction: column;
  height: 1000px;
}

#controllers {
  align-self: center;
}

#controllers {
  width: 200px;
  display: flex;
  justify-content: space-between;
}

#controllers button {
  outline: none;
  cursor: pointer;
  width: 70px;
  height: 30px;
  border-radius: 20px;
  border: solid black 5px;
  font-family: varela;
  font-weight:  bold;
}

#header
{
  text-align: center;
  background-color: gray;
  height: 60px;
  font-family: varela;
  font-weight: bold;
  font-size: 1.5em;
}

.vignette_img{
  margin-right: 10px;
}

.head_link
{
  margin-right: 20px;
  color: White;
  text-decoration: none;
}

.router-link-active
{
  color: black;
}

.vignette
{
  padding: 10px 20px 10px 20px;
  border-radius: 30px;
  color: white;
  background-color: rgb(56, 74, 85);
  text-decoration: none;
  margin-bottom: 20px;

  font-family: varela;

  display: flex;
}

.vignette_text
{
  display: flex;
  flex-direction: column;
  color: white;
}

.link_to_details
{
  color:white;
  text-decoration:none;
  font-size:1.5em;
  font-weight: bold;
}


.vignette.event {
  width: 500px;
  height: 200px;
}

#detail-box
{
  font-family: varela;
  position: fixed;
  background-color: rgb(21, 110, 168);
  z-index: 200;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#blur
{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
}

.back_btn
{
  margin-top: 10px;
  height: 35px;
  width: 100px;
  border-radius: 20px;
  border: none;
  font-family: varela;
  font-weight: bold;
  cursor: pointer;
  transition: 1s;
  outline: none;
}

.back_btn:hover{
  background-color: black;
  color: white;
}

#content
{
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.detail_title {
  font-weight: bold;
  font-size: 1.5em;
}




</style>
