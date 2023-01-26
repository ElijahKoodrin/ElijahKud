<template>
        <router-link :to="`/employee/${employee.id}`" class="employee-list employee" v-if="!editing">
            <div class="employee__name" >
                <div class="employee__name">{{ employee.name.last }}</div>
                <div class="employee__name">{{ employee.name.first }}</div>
                <div class="employee__name">{{ employee.name.father }}</div>
            </div>
            <a class="employee__email" @click.prevent="mail()">{{ employee.email }}</a>
            <div class="employee__friends">Друзья: {{ employee.friends.length }}</div>
            <button class="employee__button delete" @click.prevent="deleteEmployee(employee.id)"><i class="fa-regular fa-trash-can"></i></button>
            <button class="employee__button edit" @click.prevent="editing = true"><i class="fa-solid fa-user-pen"></i></button>
        </router-link>


        <div class="employee-list employee" v-else>
            <div class="employee__name">
                <input type="text" v-model="employeeToEdit.Last" placeholder="Фамилия" class="employee__name">
                <input type="text" v-model="employeeToEdit.First" placeholder="Имя" class="employee__name">
                <input type="text" v-model="employeeToEdit.Father" placeholder="Отчество" class="employee__name">
            </div>
            <input type="email" v-model="employeeToEdit.Mail" placeholder="Электронная почта" class="employee__name">
            <button @click="updateEmployeeI(updated)" class="employee__button confirm"><i class="fa-regular fa-circle-check"></i></button>
        </div>
</template>

<script>
// import { get } from 'http'
import { mapActions, mapGetters } from 'vuex'
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
        ...mapActions(['deleteEmployee', 'updateEmployee']),
        ...mapGetters(["allEmployees"]),
        updateEmployeeI(newEm){
            if (this.editing){
                this.updateEmployee(newEm )
                this.employee = newEm
                this.editing = false
            }
        },
        mail(){
            window.location.href = 'mailto:' + this.employee.email
        }
    }, 
    computed: {
        updated(){
            return {
                id: this.employee.id,
                name: {
                    first: this.employeeToEdit.First,
                    last: this.employeeToEdit.Last,
                    father: this.employeeToEdit.Father
                },
                email: this.employeeToEdit.Mail,
                friends: this.employee.friends
            }
        },
        validateEmail() {
            let regex = /^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
            let test = regex.test(this.updated.email.toString())
            return test
        },
        validateName() {
            const name = this.newEmployee.name

            if (
                name.last == "" ||
                name.first == ""
            )
                return false
            else {
                return true
            }
        }
        // employee() {
        //     return this.allEmployees.find(e => e.id == this.$route.params.id)
        // },
    }
}
</script>

<style scoped>
*{
    text-decoration: none;
}
</style>

