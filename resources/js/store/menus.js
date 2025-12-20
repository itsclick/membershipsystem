import axios from "axios";
import { defineStore } from "pinia";
import router from "@/router";
import { useRouter } from 'vue-router';
import Auth from './auth';



export const menustore = defineStore("menustore", {
    
    // STATE
    state: () => ({
        token:'',
        user_id:Auth.user.user_id,
        username:Auth.user.username,
        menupermission:[],
        
       
    }),

    // GETTERS
    getters: {
        getURL() {
            return router.currentRoute.value.name;
        },

         getAccess(){
            return this.menupermission.find(m => (m.menu_link  === this.getURL));
            
            
           },

       



    },

    // ACTIONS
    actions: {



        // getCurrentMenu() {
        //     const path = window.location.pathname;
    
        //     // Find menu that matches current route
        //     return this.menupermission.find(m => m.menu_link === path);
        // },
    




//get memberby id
async usermenumain() {
    try {
        const res = await axios.get(`/api/users/allpermision/${this.user_id}`);
         this.menupermission = res.data.permissions || []; 
       
    } catch (error) {
        console.error("Error loading member:", error);
        
     }
 },

    }










});
