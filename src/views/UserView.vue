<template>
  <div class="user">
    <button v-on:click="getUserList">조회</button>  <!-- v-on:click 대신 @click 가능 -->
    <h3>{{userList}}</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserView',
  data() {
    return{
      userList: []
    }
  },
  methods: {
    getUserList() {
      axios.get("https://jsonplaceholder.typicode.com/users/")
        .then( (res) => {
          this.userList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>
