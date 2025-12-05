import { createRouter, createWebHistory } from 'vue-router';
import members_list from '../componets/members_list.vue';
import dues_list from '../componets/dues_list.vue';
import group_list from '../componets/group_list.vue';
import stats from '../componets/stats.vue'
import page404 from '../componets/404.vue';
import add_member from '../componets/add_member.vue';
import add_group from '../componets/add_group.vue';
import paddues from '../componets/paydues.vue';
import editdues from '../componets/editdues.vue';
import editgroup from '../componets/editgroup.vue';


// function routeLoad(view){
//     return() => import(`../components/${view}.vue`)
// }


const routes=[
    {path:'/',name:'stats',component:stats},
    {path:'/members',name:'members',component:members_list},
    {path:'/dues',name:'dues',component:dues_list},
    {path:'/groups',name:'groups',component:group_list},
    {path:'/addmember',name:'addmember',component:add_member},
    {path:'/adddues',name:'adddues',component:members_list},
    {path:'/addgroup',name:'addgroup',component:add_group},
    {path:'/paddues/:id',name:'paddues',component:paddues,props:true},
    {path:'/editdues/:id',name:'editdues',component:editdues,props:true},
    {path:'/editgroup/:id',name:'editgroup',component:editgroup,props:true},

    

    {
        path:'/:pathMatch(.*)*', name:'error', component: page404 
    },


];





const router = createRouter({
    history: createWebHistory(), 
    routes,
  });
  
  export default router;