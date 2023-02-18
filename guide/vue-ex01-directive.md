# Vue Directive(지시자)

### 1.directive(지시자) 란?
```javascript
- Vue 의 기능들을 사용하기 위해서 사용하는 HTML 태그 안에 들어가는 하나의 속성
```

### 2.종류
<img src="/guide/img/directiveType.png">

### 3.v-on 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
```
```javascript
<template>
  <div class="user">
    <!-- v-on:click 대신 @click 가능 -->
    <button v-on:click="getUserList">조회</button>  
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
```

### 4.v-if 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
```
```javascript
<template>
  <div class="user">
    <button @click="getUserList">조회</button>
    <h3 v-if="isUserList">{{userList}}</h3>
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

### v-for 실습
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

### v-bind 실습(feat. v-show)
```javascript
- src/views/UserView.vue 에서 아래 소스 적용
- class 적용을 정적으로 하려면 일반적인 css 적용 방식을 사용
- class 적용을 동적으로 적용하기 위해서는 v-bind:class를 이용 -> 변수를 인자로 받으므로 가능
```
```javascript
<template>
  <div class="user">
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

### v-model 실습
```javascript
- src/views/UserView.vue 에서 아래 소스 적용
- v-model 속성은 v-bind(속성)와 v-on(이벤트)의 기능의 조합으로 동작 -> 예) input 태그에서는 v-bind:value 와 v-on:input 의 조합
- 사용자가 일일이 v-bind와 v-on 속성을 다 지정해 주지 않아도 좀 더 편하게 개발할 수 있게 고안된 문법인 것 -> 양방향
```
```javascript
※ 영어 외 IME 입력(한국어, 일본어, 중국어)에 대해서는 한계점 존재
-> IME 입력 경우 한 글자에 대한 입력이 끝나야지만 v-model 변수값이 인풋 박스의 입력값과 동기화됩
```
```javascript
<template>
  <div class="user">
    <span>{{syncText}}</span>
    <input v-model="syncText" />
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
      syncText: ''
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
```javascript
※ 뷰 공식 문서에서는 한국어 입력을 다룰 때 v-bind:value와 v-on:input를 직접 연결해서 사용하는 것을 권고
```
```javascript
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
```