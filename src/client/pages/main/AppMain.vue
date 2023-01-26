<template>
    <!-- <v-app class="app-main"> -->
        <div>
            <router-view :employees="employees"></router-view>
            <button v-if="!showForm" @click="showForm = !showForm">Добавить сотрудника</button>
            <AddEmployee v-if="showForm" @added="added"/>
        </div>
    <!-- </v-app> -->
</template>

<script>
import data from "./data.json"
import AddEmployee from "./components/AddEmployee.vue"

export default {
    name : 'app-main',
    data(){
        return{
            employees: data,
            showForm: false
        }
    },
    components: {
        AddEmployee
    },
    methods:{
        added(){
            this.showForm = false
        }
    }
}
</script>


<style lang="sass" src="./styles/btn.scss"></style>
<style lang="sass" src="./styles/main.scss"></style>