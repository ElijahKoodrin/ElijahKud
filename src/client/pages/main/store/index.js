import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        employees: [
            {
                "id": 1,
                "name": {
                    "first": "Илья",
                    "last": "Кудрин",
                    "father": "Олегович"
                },
                "email": "elijahkoodr@gmail.com",
                "friends": [
                    2
                ]
            },
            {
                "id": 2,
                "name": {
                    "first": "Александр",
                    "last": "Соколов",
                    "father": "Максимович"
                },
                "email": "sokolSanya@gmail.com",
                "friends": []
            },
            {
                "id": 3,
                "name": {
                    "first": "Иван",
                    "last": "Иванов",
                    "father": "Иванович"
                },
                "email": "tripleIvan@mail.ru",
                "friends": [
                    1,
                    2
                ]
            }
        ]
    },
    getters: {
        allEmployees: (state) => state.employees,
    },
    actions: {
        addEmployee({ commit }, employee) {
            commit("add_employee", employee);
        },
        deleteEmployee({ commit }, id) {
            commit("delete_employee", id);
        },
        updateEmployee({ commit }, employee) {
            commit('update_employee', employee);
        },
        deleteFriend({ commit }, array) {
            commit('delete_friend', array);
        },
        addFriend({ commit }, array) {
            commit('add_friend', array);
        }
    },
    mutations: {
        add_employee(state, employee) {
            state.employees.push(employee);
            console.log(state);
        },
        delete_employee(state, id) {
            for (let employee of state.employees) {
                if (employee.id != id) {
                    let index = employee.friends.indexOf(id);
                    if (index != -1) {
                        employee.friends.splice(index, 1)
                    }
                }
            }
            state.employees = state.employees.filter(employee => employee.id != id)
        },
        update_employee(state, employee) {
            let id = state.employees.findIndex(e => e.id == employee.id)
            state.employees[id] = employee;
            console.log(employee);
            console.log(state.employees[id]);
        },
        delete_friend(state, array) {
            let employee = array[1]
            let id = state.employees.findIndex(e => e.id == employee.id)
            let friendId = array[0]
            // console.log(friendId)
            // console.log(state.employees[id])
            let index = state.employees[id].friends.indexOf(friendId)
            state.employees[id].friends.splice(index, 1)
            console.log(state)
        },
        add_friend(state, array) {
            // console.log(array)

            let employee = array[1]
            let id = state.employees.findIndex(e => e.id == employee.id)
            let friendId = array[0]
            state.employees[id].friends.push(friendId)
            // console.log(friends);
        }
    },
    modules: {},
});