<template>
    <form style="margin-top: 20px; display: flex; align-items:center; justify-content: center; flex-direction: column">
        <div class="name">
            <input type="text" placeholder="Фамилия" v-model="employeeLast" required>
            <input type="text" placeholder="Имя" v-model="employeeFirst" required> 
            <input type="text" placeholder="Отчество" v-model="employeeFather">
        </div>
        <input type="email" placeholder="email" v-model="employeeMail" required>
        <button @click="addEmployeeI" class="add">Добавить</button>
    </form>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import { v1 } from "uuid";
export default {
    name: 'add-employee',
    data() {
        return {
            employeeMail: '',
            employeeLast: '',
            employeeFirst: '',
            employeeFather: '',
        }
    },
    methods: {
        ...mapActions(["addEmployee"]),
        addEmployeeI(){
            if (
                this.validateEmail &&
                this.validateName
            )
            {
                this.addEmployee(this.newEmployee)
                this.$emit('added')
            }
        }
    },
    computed: {
        ...mapGetters(["allEmployees"]),
        newId(){
            if (this.allEmployees[this.allEmployees.length - 1] == undefined){
                return 1
            }
            else{
                return this.allEmployees[this.allEmployees.length - 1].id + 1
            }
        },
        newEmployee(){
            return {
                id: this.newId,
                email: this.employeeMail,
                name: {
                    last: this.employeeLast,
                    first: this.employeeFirst,
                    father: this.employeeFather,
                },
                friends: []
            }
        },
        validateEmail(){
            let regex =/^((?!\.)[\w_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
            let test = regex.test(this.newEmployee.email.toString())
            return test
        },
        validateName(){
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
    }
}
</script>

<style lang="sass" src="../styles/AddEmployee.scss" scoped></style>