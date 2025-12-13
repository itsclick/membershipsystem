<template>
    <form>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-8">
          <h5>Adding New system menu </h5>
  
          <div class="card">
            <div class="card-body pt-0">
  <!-- {{ Erromsg }} -->

                    
              <!-- Group ID Field -->
              
  
              <!-- Group Name Field -->
              <div class="mb-3">
                <label class="form-label">Menu Name</label>
                <input type="text"  class="form-control" v-model="groupform.menu_name"  placeholder="Group Name">
              </div>

              <div class="mb-3">
                <label class="form-label">Menu Link / Route</label>
                <input type="text"  class="form-control" v-model="groupform.menu_link"  placeholder="Group Name">
              </div>

              <div class="mb-3">
                <label class="form-label">Menu Icon</label>
                <input type="text"  class="form-control" v-model="groupform.menu_icon"  placeholder="Group Name">
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text"  class="form-control" v-model="groupform.des"  placeholder="Group Name">
              </div>
  
              <!-- Save Button -->
              <button  
                type="button"
                class="btn btn-primary"  @click="savemenubtn"> Save Menu</button>
  
            </div>
          </div>
  
        </div>
      </div>
    </form>
  </template>
  
  <script setup>
import { onMounted,ref } from "vue";
import axios from "axios";
  import { useMemberStores } from "../../store/members_store";
  import { storeToRefs } from 'pinia';
  import { useRouter } from "vue-router";
  



  //varibale here
  const { saveloader,showErrro, Erromsg} = storeToRefs(useMemberStores());

  //functions below
  const {  savemenus } = useMemberStores();
  
  // FORM DATA
  const groupform = ref({
   
    menu_name: "",
    menu_link: "",
    menu_icon: "na",
    des: "",
   
  });
  
  
  function savemenubtn(){

    savemenus(groupform.value);
  }
  
 
  </script>
  
  <style scoped>
  .text-danger {
    font-size: 0.875rem; /* smaller text for error */
  }
  </style>
  