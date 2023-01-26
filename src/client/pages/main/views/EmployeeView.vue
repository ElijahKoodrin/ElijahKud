<template>
    <div class="employee">
        <div class="left">
            <div class="name">
                <div class="name_child">Фамилия: <span>{{ employee.name.last }}</span></div>
                <div class="name_child">Имя: <span>{{ employee.name.first }}</span></div>
                <div class="name_child">Отчество: <span>{{ employee.name.father }}</span></div>
            </div>
            <a class="email" :href="`mailto: ${employee.email}`">E-mail: <span>{{ employee.email }}</span></a>
        </div>
        <div class="friends-list right"> Друзья:
            <div v-if="employee.friends.length > 0"> 
                <router-link 
                :to="`/employee/${friend.id}`" 
                class="friends-list friend" 
                v-for="friend in friends" 
                :key="friend.id">
                {{ friend.name.last }} {{ friend.name.first }} {{ friend.name.father }} 
                <i class="fa-solid fa-user-xmark" @click.prevent="deleteFriendI(friend.id)"></i>
                </router-link>
            </div>
            <div v-if="addingFriend" class="addingFriend">
                <select name="addFriend" id="" v-model="addFriendVal">
                    <option :value="notFriend.id" v-for="notFriend in notFriends" :key="notFriend.id">{{ notFriend.name.last }} {{ notFriend.name.first }} {{notFriend.name.father}}</option>
                </select>
            </div>
            <button class="friends_list add" @click="addFriendI(addFriendVal)">Добавить друга</button>
        </div>
            <router-link to="/">На главную</router-link>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "employee-view",
        props: ['employees'],
        data(){
            return{
                addingFriend: false,
                addFriendVal: -1
            }
        },
        methods:{
            log(string){
                console.log(string)
            },
            ...mapActions(['deleteFriend', 'addFriend']),
            deleteFriendI(id){
                this.deleteFriend([id, this.employee])
            },
            addFriendI(id){
                if (this.addingFriend){
                    this.addFriend([id, this.employee])
                    // console.log(this.employee)
                    this.addingFriend = false
                }
                else{
                    this.addingFriend = true
                }
            }
        },
        computed: {
            ...mapGetters(["allEmployees"]),
            employee()  {
                return this.allEmployees.find(e => e.id == this.$route.params.id)
            },
            friends() {
                let list = []
                for (let worker of this.allEmployees){
                    if (this.employee.friends.includes(worker.id)){
                        list.push(worker)
                    }
                }
                return list
            },
            notFriends(){
                let list = []
                for (let worker of this.allEmployees) {
                    if (!(this.employee.friends.includes(worker.id)) && worker.id != this.employee.id) {
                        list.push(worker)
                    }
                }
                return list
            }
        }
    }
</script>


<style scoped lang="sass" src="../styles/oneEmployee.scss"></style>