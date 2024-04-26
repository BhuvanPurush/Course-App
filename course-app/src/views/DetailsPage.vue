<template>
        <v-container>
            <h1>Course Details</h1>
            <v-row justify="center"> 
                <v-col cols="12"> 
                    <v-card max-width="700">
                        <v-card-title>{{courseData.org}}</v-card-title> 
                        <v-img :src="courseData.image_url" height="300"></v-img> <v-card-title>{{courseData.title}}</v-card-title> 
                        <v-card-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </v-card-text> 
                    </v-card> 
                </v-col> 
            </v-row>       
            <v-divider v-if="recentFavData.length!=0"></v-divider>
            <h2 v-if="recentFavData.length!=0">Recent Favourites:</h2>
            <v-row v-if="recentFavData.length!=0"> 
                <v-col cols="12" md="4" v-for="favourite in recentFavData" :key="favourite.id">                
                    <v-card 
                        class="mx-auto"
                        max-width="300"
                        color="#FFFDD0"
                        hover
                        link> 
                        <v-img :src="favourite.image_url" height="70px">
                        </v-img>
                        <v-card-title>
                            {{favourite.org}}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container> 
</template>        

<script>
import { mapGetters } from 'vuex';

export default {
    data () {
        return {
            courseData: {},
            recentFavData: []
        }
    },
    computed: {        
        ...mapGetters(['coursesList', 'recentFavourites']),

    },
    mounted() { 
        const id = this.$route.params.id
        const data = this.coursesList.find(course => course.id === id)
        this.courseData = data;        
        
        this.coursesList.find(course => {
            this.recentFavourites.find(recentFav => {
               if (course.id === recentFav) {
                    this.recentFavData.push(course)
               } 
            })
        })
        console.log(this.recentFavourites);
        console.log(this.recentFavData);
    }
}
</script>