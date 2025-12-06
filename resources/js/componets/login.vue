<template>

    <div class="container login-container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="login-card">
                    <h3 class="text-center mb-4">Authentication</h3>
    
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control" v-model="loginform.username" placeholder="Enter username" required>
                        </div>
    
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="loginform.password" placeholder="Enter password" required>
                        </div>
    
                        <button type="button" class="btn btn-primary w-100 mt-3" @click="login">Login</button>
                    </form>
    
                </div>
            </div>
        </div>
    </div>
    
    </template>


<script setup>
import { onMounted,ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Auth from "../store/auth.js";

const router = useRouter();

const loginform =ref({
username:'',
password:'',
});

function  login() {
            try {
                    axios.post('api/users/login',loginform.value)
                    .then(({data}) => {
                        
                   Auth.login(data.access_token,data.user); //set local storage

                     router.push("/dashboard");
                    // window.location.href = "/members";

                    })
                    .catch((error) => {

                    console.log(error);
                    });

              

            } catch (err) {
                
            }
}


</script>



<style lang="css" scoped>
</style>