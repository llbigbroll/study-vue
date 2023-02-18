<template>
  <div class="user">
    <span>{{valueTxt}}</span>
    <input v-bind:value="valueTxt" @input="doinputTxt"/>
    <button @click="getUserList">조회</button>
    <button v-show="isUserList" @click="moveTableAlign">중앙으로</button>
    <table v-if="isUserList" v-bind:class="tableAlign">
      <thead>
        <tr>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="userInfo in userList" v-bind:key="userInfo">
            <td>{{userInfo.name}}</td>
            <td>{{userInfo.phone}}</td>
            <td>{{userInfo.email}}</td>
        </tr>
      </tbody>
    </table>
    <h3 v-else>조회 데이터가 없습니다!</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserView',
  data() {
    return{
      userList: [],
      isUserList: false,
      tableAlign: '',
      valueTxt: ''
    }
  },
  methods: {
    getUserList() {
      axios.get("https://jsonplaceholder.typicode.com/users/")
        .then( (res) => {
          this.userList = res.data;
          this.isUserList = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    moveTableAlign() {
      this.tableAlign = 'position';
    },
    doinputTxt(event) {
      this.valueTxt = event.target.value;
    }
  }
}
</script>

<style scoped>
  table {
    border: 1px solid;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid;
  }
  .position {
    margin: 10px 0px 0px 35vw;
  }
</style>
