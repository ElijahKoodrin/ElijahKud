<template>
        <div class="employee-list">
<!--          плохо использовать id при удалении из массива ты получаешь warning разберись с ним
Duplicate keys detected: '3'. This may cause an update error.

-->
            <Employee v-for="employee in allEmployees" :employee="employee" :key="employee.id" />
        </div>
</template>

<script>
import store from '../store/index'
import Employee from "../components/Employee.vue"

export default {
    name: 'home-view',
    components: {
        Employee
    },
    data() {
        return {
        }
    },
    props: ['employees'],
    computed:{
        allEmployees(){
            return store.getters.allEmployees
        }
    }
}
</script>
