<template>
    <div class="contain">
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-img
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-img>
        
        <v-card-title>
          Top western road trips
        </v-card-title>
    
        <v-card-subtitle>
          1,000 miles of wonder
        </v-card-subtitle>
    
        <v-card-actions>
          <v-btn
            color="orange-lighten-2"
            variant="text"
          >
            更多信息
          </v-btn>
      
          <v-spacer></v-spacer>
      
          <v-btn
            :icon="show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show1 = !show1"
          ></v-btn>
        </v-card-actions>
    
        <v-expand-transition>
          <div v-show="show1">
            <v-divider></v-divider>
        
            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-img
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-img>
        
        <v-card-title>
          Top western road trips
        </v-card-title>
    
        <v-card-subtitle>
          1,000 miles of wonder
        </v-card-subtitle>
    
        <v-card-actions>
          <v-btn
            color="orange-lighten-2"
            variant="text"
          >
            更多信息
          </v-btn>
      
          <v-spacer></v-spacer>
      
          <v-btn
            :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show2 = !show2"
          ></v-btn>
        </v-card-actions>
    
        <v-expand-transition>
          <div v-show="show2">
            <v-divider></v-divider>
        
            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-img
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-img>
        
        <v-card-title>
          Top western road trips
        </v-card-title>
    
        <v-card-subtitle>
          1,000 miles of wonder
        </v-card-subtitle>
    
        <v-card-actions>
          <v-btn
            color="orange-lighten-2"
            variant="text"
          >
            更多信息
          </v-btn>
      
          <v-spacer></v-spacer>
      
          <v-btn
            :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="show2 = !show2"
          ></v-btn>
        </v-card-actions>
    
        <v-expand-transition>
          <div v-show="show2">
            <v-divider></v-divider>
        
            <v-card-text>
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>

</template>

<script setup>
import {ref} from 'vue'
const show1 = ref(false);
const show2 = ref(false);
</script>

<style lang="scss" scoped>
.contain {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4vh;;

}
</style>