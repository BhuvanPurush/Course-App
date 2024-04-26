<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2>Search Courses</h2>
                <v-text-field
                    v-model.trim="search"
                    @keyup="searchCoursesList()"
                    type="text"
                    label="Type to search courses..."
                >
                </v-text-field>                           
            </v-col>
        </v-row>    
        <v-progress-circular
            indeterminate
            v-if="loader"
        ></v-progress-circular>
        
        <v-row v-if="noResults">
             <v-alert
                border="top"
                type="warning"
                class="no-results"
            >
            No results found. Try with different course...
            </v-alert>
        </v-row>
        <v-row v-if="searchResults">
            <v-col col="12" md="3" v-for="(course, index) in searchResults" :key="index"> 
                <v-card 
                    class="mx-auto rounded-border-card"
                    max-width="400"
                    color="#FFFDD0"
                    hover
                    link> 
                    <v-img :src="course.image_url" height="250px" 
                    @click="openCourseDetailPage(course.id)">
                    </v-img>
                    <v-card-title >
                        {{course.org}}   
                        <v-spacer></v-spacer>                
                        <v-btn text @click="markAsFavourite(course.id)">
                            <i class="material-icons">favorite_border</i> 
                        </v-btn>
                    </v-card-title>
                    <v-card-text 
                    @click="openCourseDetailPage(course.id)">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </v-card-text>
                    <v-card-subtitle >
                        <i class="material-icons" style="font-size:15px;color:#12AD2B">play_circle_outline</i>
                        {{course.pacing}}                  
                        <v-btn
                            text
                            class="lang-button"
                        >
                            <i class="material-icons">translate</i>
                            {{course.language}}
                        </v-btn>
                    </v-card-subtitle>    
                </v-card>
            </v-col>
        </v-row>        
        
    </v-container>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            search: '',
            showCoursesList: false,
            searchResults: '',
            favSymbol: false,
            selectedCourseId: [],
            noResults: false,
            loader: false
        }
    },
    computed: {        
        ...mapGetters(['recentFavourites', 'coursesList']),
        
    },
    methods: {
        ...mapActions(['addFavourite']),

        async searchCoursesList() { 
            this.searchResults = '';
            if (this.search) {
                this.loader = true;
                await fetch("https://lxp-api-develop.azure-api.net/DevStage/courses/discovery-paginated?page=1&page_size=20&language=en")
                .then(response => response.json())
                .then(res => {   
                    this.loader = false;
                    this.searchResults = '';
                    this.noResults = false;

                    this.searchResults = res.results.filter(data => {  
                    return data.title.toLowerCase().includes(this.search.toLowerCase()) || data.source.toLowerCase().includes(this.search.toLowerCase()) || data.org.toLowerCase().includes(this.search.toLowerCase()) || data.pacing.toLowerCase().includes(this.search.toLowerCase())
                    });     

                    if (this.searchResults.length == 0) {
                        this.noResults = true;
                    }  
                })
                .catch(error => {
                    console.error(error)
                })
                ;      
                this.$store.commit('searchedCoursesList', this.searchResults)
            }   
        },
        markAsFavourite(id) { 
            this.selectedCourseId.push(id);
            // if(!this.favSymbol)
            //     this.favSymbol = true;
            // else                
            //     this.favSymbol = false;
            this.addFavourite(id);
        } ,
        openCourseDetailPage(id) {
            console.log(this.coursesList);
            this.$router.push({ name: 'detailsPage', params: { id }})
        }    

    }
}
</script>

<style scoped>
    .rounded-border-card {
        border-radius: 25px;
    }
    .v-card__text {
        text-align: start !important;
        font-size: 155%;
        font-weight: 600;
        width: 100%;
        height: 115px;
        line-height: 155%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    .v-card__subtitle { 
        text-align: start !important;
        font-size: 120%;
        color :#12AD2B!important;
        text-transform: capitalize;
    }
    .lang-button {
        font-size: 20px!important;
        float: right;
        margin-top: -9px;
    }
    .no-results {
        background-color: rgb(245, 195, 102)!important;
    }
    .v-progress-circular {
        height: 150px!important;
        width: 100px!important;
        color: rgb(122, 172, 212);
    }

</style>
