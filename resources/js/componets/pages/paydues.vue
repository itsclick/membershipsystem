<template>
    <div>
      
      <!-- Heading -->
      <h5>
        Paying dues for -  {{ formvalue.fname }} {{ formvalue.lname }}
      </h5>
      
  
      <!-- Form -->
      <form v-if="formvalue">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-12">
            <div class="card">
              <div class="card-body pt-0">
  
                <!-- Member Info -->
                <div class="mb-3">
                  <label class="form-label">Member ID</label>
                  <input type="text" class="form-control" :value="formvalue.mid" readonly>
                </div>
  
                <div class="mb-3">
                  <label class="form-label">First Name</label>
                  <input type="text" class="form-control" :value="formvalue.fname" readonly>
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Last Name</label>
                  <input type="text" class="form-control" :value="formvalue.lname" readonly>
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Group ID</label>
                  <input type="text" class="form-control" :value="formvalue.gid" readonly>
                </div>
  
                <!-- Dues Form -->
                
  
                <div class="mb-3">
                  <label class="form-label">Amount</label>
                  <input type="text" class="form-control" v-model="formvalue.amt" placeholder="Amount">
                 
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Payment Date</label>
                  <input type="date" class="form-control" v-model="formvalue.pdate">
                  
                </div>
  
                <div class="mb-3">
                  <label class="form-label">Payment Month</label>
                  <input type="month" class="form-control" v-model="formvalue.pmonth">
                </div>
  
                <!-- Save Button -->
                <button
                  type="button" class="btn btn-primary" @click="savepaymentbtn" > Save Dues</button>
  
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>


import { onMounted } from "vue";
  import { useMemberStores } from "../../store/members_store";
  import { storeToRefs } from 'pinia';


//varibale here
const { formvalue } = storeToRefs(useMemberStores());

//functions below
const {getmemberid, duespayment} = useMemberStores();


const props = defineProps({
        id:{
            type:String,
            default: ''
        }
     })
     onMounted(async () => {
       
      getmemberid(props.id);
    })

    function savepaymentbtn(){
   
      duespayment(formvalue.value);
 }
  
  </script>
  
  <style scoped>
  .text-danger {
    font-size: 0.875rem;
  }
  </style>
  