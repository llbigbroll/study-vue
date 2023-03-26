# Vue Inheritance(상속)

### 1.Inheritance(상속) 란?
```javascript
- Vue 의 Templete 트리구조에서 부모-자식 컴포넌트 간 데이터 공유
```

### 2.개요
<img src="/guide/img/inheritance.png">

### 3.요약
```javascript
* props(속성): 부모 컴포넌트에서 자식 컴포넌트로 데이터 전달
* emit(이벤트): 자식 컴포넌트에서 부모 컴포넌트로 데이터 전달
```

### 4.props 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
- 부모(전달자): 컴포넌트의 속성(v-bind, :)을 이용하여 부모에서 자식으로 데이터 전달
- 자식(수신자): props를 이용하여 부모에게서 전달된 데이터 수신
(props는 해당 컴포넌트에서 사용자 정의 속성인 셈)
```
```javascript
<template>
  <div class="user">
    <p>vue update count: {{updateCnt}}</p>
    <span>{{textType}}</span>
    <input ref="inputRef" :value="valueTxt" @input="doinputTxt" :placeholder="inputNoti"/>
    <button @click="getUserList">조회</button>
    <button v-show="isUserList" @click="moveTableAlign">중앙으로</button>
    <!-- <UserInfoGrid :class="tableAlign" :itemList="userList" :isItemList="isUserList" /> -->
    <user-info-grid :class="tableAlign" :itemList="userList" :isItemList="isUserList" />
  </div>
</template>

<script>
import axios from 'axios';
import UserInfoGrid from '@/components/UserInfoGrid.vue';

export default {
  name: 'UserView',
  components: {
    UserInfoGrid
  },
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
    },
    inputUserName(name) {
      this.valueTxt = '';
      this.valueTxt = name;
    }
  }
}
</script>

<style scoped>
</style>
```
```javascript
src/components/UserInfoGrid.vue 에서 아래 소스 적용(신규)
```
```javascript
<template>
  <div>
    <table v-if="isItemList">
      <thead>
        <tr>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemList" v-bind:key="item">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.email}}</td>
        </tr>
      </tbody>
    </table>
    <h3 v-else>조회 데이터가 없습니다!</h3>
  </div>
</template>

<script>
export default {
  name: 'UserInfoGrid',
  props: {
    itemList: [],
    isItemList: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return{
      tableAlign: '',
    }
  },
  methods: {
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

### 5.emit 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
- 자식(전달자): $emit 명령어를 통해 자식에게서 부모로 데이터 전달
- 부모(수신자): 이벤트(v-on, @)를 통해 자식으로 부터 전달된 데이터 수신 -> 이벤트 리스너 필요(method 정의 필요)
(emit은 해당 컴포넌트에서 사용자 정의 이벤트인 셈)
```
```javascript
<template>
  <div class="user">
    <p>vue update count: {{updateCnt}}</p>
    <span>{{textType}}</span>
    <input ref="inputRef" :value="valueTxt" @input="doinputTxt" :placeholder="inputNoti"/>
    <button @click="getUserList">조회</button>
    <button v-show="isUserList" @click="moveTableAlign">중앙으로</button>
    <!-- <UserInfoGrid :class="tableAlign" :itemList="userList" :isItemList="isUserList" /> -->
    <user-info-grid :class="tableAlign" :itemList="userList" :isItemList="isUserList" @getUserName="inputUserName"/>
  </div>
</template>

<script>
import axios from 'axios';
import UserInfoGrid from '@/components/UserInfoGrid.vue';

export default {
  name: 'UserView',
  components: {
    UserInfoGrid
  },
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
    },
    inputUserName(name) {
      this.valueTxt = '';
      this.valueTxt = name;
    }
  }
}
</script>

<style scoped>
</style>
```
```javascript
src/components/UserInfoGrid.vue 에서 아래 소스 적용
```
```javascript
<template>
  <div>
    <table v-if="isItemList">
      <thead>
        <tr>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in itemList" v-bind:key="item">
            <td>{{item.name}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.email}}</td>
            <td><button @click="sendTextBox(item.name)">이름 보내기</button></td>
        </tr>
      </tbody>
    </table>
    <h3 v-else>조회 데이터가 없습니다!</h3>
  </div>
</template>

<script>
export default {
  name: 'UserInfoGrid',
  props: {
    itemList: [],
    isItemList: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return{
      tableAlign: '',
    }
  },
  methods: {
    moveTableAlign() {
      this.tableAlign = 'position';
    },
    sendTextBox(name) {
      this.$emit('getUserName', name);
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
