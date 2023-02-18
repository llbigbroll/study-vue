<template>
  <div class="user">
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
  created() {
    this.getUserList();
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