# Vue Lifecyle(생애주기)

### 1.Lifecyle(생애주기) 란?
```javascript
- Vue 의 인스턴스가 생성부터 소멸되기까지 거치는 과정
```

### 2.개요
<img src="/guide/img/lifecyle.png">

### 3.요약
```javascript
* created: vue 인스턴스가 생되는 시기
* mounted: templete 이 생성된 후 vue 구성요소(elemment)들이 주입되는 시기
* updated: vue 인스턴스가 변경된 후 가상DOM이 재 랜더링 되는 시기
* destroyed: vue 인스턴스가 제거되는 시기
```

### 4.created 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
```
```javascript
<template>
  <div class="user">
    <span>{{valueTxt}}</span>
    <input :value="valueTxt" @input="doinputTxt" :placeholder="inputNoti"/>
    <button @click="getUserList">조회</button>
    <button v-show="isUserList" @click="moveTableAlign">중앙으로</button>
    <table v-if="isUserList" :class="tableAlign">
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
      valueTxt: '',
      inputNoti: '',
    }
  },
  created() {
    this.inputNoti = 'v-model 한글 입력 TEST';
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
```

### 5.mounted 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
```
```javascript
<template>
  <div class="user">
    <button @click="getUserList">조회</button>
    <table v-if="isUserList">
      <thead>
        <tr>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <!-- v-for 사용 시 배열의 항목 변수를 v-bind:key 에 선언 해주어야 함 -->
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
    }
  }
}
</script>
```

### 6.updated 실습
```javascript
- src/views/UserView.vue 에서 아래 소스 적용

※ 주의! update는 Vue element(구성요소)에 변경점이 생겼을 떄의 시점으로
  만약 update 안에 vue element를 변경하는 소스를 구성하면 재귀 패턴으로 무한 루틴이 될 수 있음
  -> Vue element 변화 시 다른 vue element를 제어 해야 할 경우: deforUpdate를 이용!!
```
```javascript
<template>
  <div class="user">
    <p>vue update count: {{updateCnt}}</p>
    <span>{{valueTxt}}</span>
    <input ref="inputRef" :value="valueTxt" @input="doinputTxt" :placeholder="inputNoti"/>
    <button @click="getUserList">조회</button>
    <button v-show="isUserList" @click="moveTableAlign">중앙으로</button>
    <table v-if="isUserList" :class="tableAlign">
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
      valueTxt: '',
      inputNoti: '',
      updateCnt: 0,
    }
  },
  created() {
    this.inputNoti = 'v-model 한글 입력 TEST';
  },
  mounted() {
    this.$refs.inputRef.focus();  // this.$refs['inputRef'].fucus(); 와 동일
  },
  beforeUpdate() {
    this.updateCnt += 1;
  },
  updated() {
    console.log("*** updated call ***")
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
```

### 7.destroyed 실습
```javascript
- src/views/UserView.vue 에서 아래 소스 적용
- Vue3 에서 beforeDestroy -> beforeUnmount, destroyed -> umounted 로 명명이 변경

※ 주의! destroyed 의 경우 Vue element(구성요소) 가 해제 된 이후의 시점으로
   destroyed 안에 vue element를 제어하는 소스 구성 시 에러발생
   -> 해제 전 vue element를 제어 해야 할 경우: deforDestroy를 이용!!
```
```javascript
<template>
  <div class="user">
    <p>vue update count: {{updateCnt}}</p>
    <span>{{valueTxt}}</span>
    <input ref="inputRef" :value="valueTxt" @input="doinputTxt" :placeholder="inputNoti"/>
    <button @click="getUserList">조회</button>
    <button v-show="isUserList" @click="moveTableAlign">중앙으로</button>
    <table v-if="isUserList" :class="tableAlign">
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
      valueTxt: '',
      inputNoti: '',
      updateCnt: 0,
    }
  },
  created() {
    this.inputNoti = 'v-model 한글 입력 TEST';
  },
  mounted() {
    this.$refs.inputRef.focus();  // this.$refs['inputRef'].fucus(); 와 동일
  },
  beforeUpdate() {
    this.updateCnt += 1;
  },
  updated() {
    console.log("*** updated call ***");
  },
  unmounted() {
    console.log("*** unmount call ***");
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
```
