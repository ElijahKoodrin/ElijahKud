<template>
        <div class="employee-list">
            <Employee v-for="employee in allEmployees" :employee="employee" :key="employee.id" />
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
        ...mapGetters(["allEmployees"])
    }
}
</script>