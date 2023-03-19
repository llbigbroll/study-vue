# Vue Observe(관찰)

### 1.Observe(관찰) 란?
```javascript
- Vue 변수 동기/비동기 자동 처리
* 동기처리: computed
* 비동기처리: watch
```

### 2.개요
<img src="/guide/img/observe.png">

### 3.요약
```javascript
* computed(지정하다): 특정 변수의 재정의(동기식: 일시적 수행)
* watch(지켜보다): 특정 변수를 지속적으로 관찰 후 변경이 생기면 설정한 작업 수행(비동기: 상시적 수행)
```

### 4.computed 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
- 재정의 된 변수는 return 으로 받음
- return 으로 재정의된 변수를 받으면 re render은 하지 않음 즉, return 후 computed는 종료
```
```javascript
<template>
  <div class="user">
    <p>vue update count: {{updateCnt}}</p>
    <span>{{textType}}</span>
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
      textTypeCheck: '',
      inputNoti: '',
      updateCnt: 0,
    }
  },
  computed: {
    textType() {
      return (this.valueTxt == '')? '입력값: 입력하세요...': this.textTypeCheck;
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

### 5.watch 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
- trigger: 변수 값
- result: 특정 작업
```
```javascript
<template>
  <div class="user">
    <p>vue update count: {{updateCnt}}</p>
    <span>{{textType}}</span>
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
      textTypeCheck: '',
      inputNoti: '',
      updateCnt: 0,
    }
  },
  computed: {
    textType() {
      return (this.valueTxt == '')? '입력값: 입력하세요...': this.textTypeCheck;
    }
  },
  watch: {
    'valueTxt': function(v) {
      let lastStr = v.substr(-1);
      this.textTypeCheck = '입력값: ' + lastStr + ' > 기타...'
      if(/^[ㄱ-ㅎ|가-힣]+$/.test(lastStr)) {
        this.textTypeCheck = '입력값: ' + lastStr + ' > 한글...';
      }
      if(/^[a-z|A-Z]+$/.test(lastStr)) {
        this.textTypeCheck = '입력값: ' + lastStr + ' > 영어...';
      }
      if(/^[ㄱ-ㅎ|가-힣]+$/.test(lastStr)) {
        this.textTypeCheck = '입력값: ' + lastStr + ' > 한글...';
      }
      if(/^[0-9]+$/.test(lastStr)) {
        this.textTypeCheck = '입력값: ' + lastStr + ' > 숫자...';
      }
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
