# Vue Directive(지시자)

### directive(지시자) 란?
```javascript
- Vue 의 기능들을 사용하기 위해서 사용하는 HTML 태그 안에 들어가는 하나의 속성
```

### 종류
<img src="/guide/img/directiveType.png">

### v-on 실습
```javascript
src/views/UserView.vue 에서 아래 소스 적용
```
```javascript
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
```

### 프로젝트 생성 및 실행
```javascript
1.github에 프로젝트를 push할 repository 생성

2.vscode의 상단 명령창에 ctrl + shift + P -> gitcl 입력 -> git:clone(git:복제)

3.github에 로그인하라는 메시지가 표시되면 로그인 프로세스를 완료합니다.

4.연결할 github의 repository URL 선택 (1번 단계에서 만들어두었던 repository 선택)

5.연동할 디렉토리 선택 (소스코드 저장하고 관리할 로컬 폴더 경로 선택)

6.초기 vue 프로젝트 생성 (위에서 github와 연동한 폴더에서)
* vscode 터미널 open
  ㄱ. vue -V  -> vue-cli 설치 유무 확인 (설치되어있다면 vue/cli 버전이 나올 것)
  ㄴ. npm install -g @vue/cli  -> vue-cli 다운로드 (vue-cli 미설치 시)
  ㄷ. vue create 프로젝트 파일명  -> vue 프로젝트 생성, package.json 생성 (예: vue create pjtName)
  ㄹ. cd 프로젝트 파일명  -> 프로젝트 폴더로 이동 (예: cd pjtName)
  ㅁ. npm install  -> package.json 의 라이브러리 다운로드


7. 프로젝트 실행
  ㄱ. vscode 우측 하단: Go Live 클릭 -> Live server 활성화
  ㄴ. 터미널에서 npm run serve 입력 -> vue 프로젝트 실행 (package.json 에서 각종 실행명령 확인 가능!)
  ㄷ. 브라우저에서 http://127.0.0.1:8080 입력 -> 프로젝트 화면 open
```

### router 적용
```javascript
- 터미널에서 vue add router 입력 -> 설치 진행 중 Use history mode for router? N 설정


* router 란? vue에서 vue-page이동을 위한 주소지정

* history mode? vue-page 이동 시 URL을 서버로 호출 -> SPA에 적합하지 않음
```

### axios 적용
```javascript
- 터미널에서 npm install axios 입력 ->  package.json 에서 설치된 axios 버전 확인 가능

* axios 란?
  - node.js와 브라우저를 위한 Promise 기반 HTTP 비동기 통신 클라이언트 -> node_module이 필요
```

### axios 실습
```javascript
1.App.vue 수정
  <template>
    <div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/user">User</router-link>
      </nav>
      <router-view/>
    </div>
  </template>
  생략..


2./views/UserView.vue 생성
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


3./router/index.js 수정
  import { createRouter, createWebHashHistory } from 'vue-router'
  import HomeView from '../views/HomeView.vue'
  import AboutView from '../views/AboutView.vue'
  import UserView from '../views/UserView.vue'

  const routes = [
    // default page
    {path: '/', name: 'home', component: HomeView},
    // etc page
    {path: '/about', name: 'about', component: AboutView},
    {path: '/user', name: 'user', component: UserView},
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  export default router


4. 프로젝트 실행/확인
```