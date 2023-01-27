<template>
        <router-link :to="`/employee/${employee.id}`" class="employee-list employee" v-if="!editing">
            <div class="employee__name" >
                <p>{{ employee.name.last }}</p>
                <p>{{ employee.name.first }}</p>
                <p>{{ employee.name.father }}</p>
            </div>
            <a class="employee__email" @click.prevent="mail()">{{ employee.email }}</a>
            <p class="employee__friends">Друзья: {{ employee.friends.length }}</p>
            <button class="employee__button delete" @click.prevent="deleteEmployee"><i class="fa-regular fa-trash-can"></i></button>
            <button class="employee__button edit" @click.prevent="editing = true"><i class="fa-solid fa-user-pen"></i></button>
        </router-link>


        <form class="employee-list employee" v-else>
            <div class="employee__name">
                <input type="text" v-model="employeeToEdit.Last" placeholder="Фамилия" class="employee__name" required>
                <input type="text" v-model="employeeToEdit.First" placeholder="Имя" class="employee__name" required>
                <input type="text" v-model="employeeToEdit.Father" placeholder="Отчество" class="employee__name">
            </div>
            <input type="email" v-model="employeeToEdit.Mail" placeholder="Электронная почта" class="employee__name" required>
            <button @click.prevent="updateEmployeeI()" type="submit" class="employee__button confirm"><i class="fa-regular fa-circle-check"></i></button>
        </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import validate from "../utils/validate.js"
import store from '../store/index'


export default {
    name: "employee",
    props: ["employee"],
    data(){
        return{
            editing: false,
            employeeToEdit: {
                First: this.employee.name.first,
                Last: this.employee.name.last,
                Father: this.employee.name.father,
                Mail: this.employee.email,
            }
        }
    },
    methods:{
        // ...mapActions(['deleteEmployee']),
        deleteEmployee(){
            store.dispatch('deleteEmployee', employee.id)
        },
        updateEmployeeI(){
            if (this.editing){

                let name = {
                    first: this.employeeToEdit.First,
                    last: this.employeeToEdit.Last,
                    father: this.employeeToEdit.Father
                }
                if (
                    validate.validateEmail(this.employeeToEdit.Mail)
                    &&
                    validate.validateName(name))
                {
                    store.dispatch('updateEmployee', {
                        id: this.employee.id,
                        name: name,
                        email: this.employeeToEdit.Mail,
                        friends: this.employee.friends
                    })
                    this.employee = {
                        id: this.employee.id,
                        name: name,
                        email: this.employeeToEdit.Mail,
                        friends: this.employee.friends
                    }
                    this.editing = false
                }
            }
            else{
                
            }
        },
        mail(){
            window.location.href = 'mailto:' + this.employee.email
        }
    }
}
</script>

<style scoped>
*{
    text-decoration: none;
}
</style>

