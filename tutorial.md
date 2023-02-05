# Vue tutorial

### 소개
```
1.vue 란?
  - 웹 개발을 단순화하고 정리하기 위해 개발된 대중적인 자바스크립트 프론트엔드 프레임워크
  - 고성능의 SPA(single page application) 구축에 이용
    (vue에서 html은 index.html 하나 뿐 -> 실제 화면은 하나라는 의미)

2.vue-cli 란?
  vue-cli 는 기본 vue 개발 환경을 설정해주는 도구입니다. 
  vue-cli 가 기본적인 프로젝트 세팅을 해주기 때문에 폴더 구조에 대한 고민을 줄여줌
  (lint, build, library, webpack 설정은 어떻게 해야되는지 등)

* 여기서 CLI 란?
  명령 줄 인터페이스(CLI, Command line interface) 또는 명령어 인터페이스로
  텍스트 터미널을 통해 사용자와 컴퓨터가 상호 작용하는 방식을 뜻한다.
  즉, 작업 명령은 사용자가 컴퓨터 키보드 등을 통해 문자열의 형태로 입력하며
  컴퓨터로부터의 출력 역시 문자열의 형태로 주어진다.
```

### 준비
```
1. node.js 다운로드 및 설치
  - https://nodejs.org/en/
  - 설치 후 cmd에서 node -v 또는 npm -v 로 버전 확인


2.vscode 다운로드 및 설치
  - https://code.visualstudio.com/


3.vscode 실행 후 확장 plugin 설치
* Plugin 명 / 제작자
  - Auto Close Tag / Jun Han  -> tag 작성 시 자동 close 입력
  - Auto Rename Tag / Jun Han  -> tag 이름 수정 시 open, close 동기화
  - ESLint / Microsoft  -> javascript 문법 오류 필터(ft. 통일된 소스코드 작성 규직 정의) 
  - htmltagwrap / Brad Gashler  -> html tag 자동완성
  - Korean Language Pack for Visual Studio Code / Microsoft  -> VScode 한국어 Package
  - Live Server / Ritwick Dey  -> vscode 내부 임시 서버(별도의 서버 없이 vscode 자체가 서버가 됨)
  - open in browser / TechER  -> PC에 기본 설정된 browser VScode에서 열기
  - Prettier - Code formatter / Prettier  -> 소스코드 기능별로 font-color 수분
  - Vetur / Pine Wu  -> Vue Plugin (Vue 편집)
  - Vue Language Features (Volar) / Vue  -> Vue Plugin 확장팩(Vue 편집 효율 향상-Vue 문법 수정 제안 등)
```

### 프로젝트 생성 및 실행
```
1.worksapce에 초기 vue 프로젝트 생성
* vscode 터미널 open
  ㄱ. vue -V  -> vue-cli 설치 유무 확인 (설치되어있다면 vue/cli 버전이 나올 것)
  ㄴ. npm install -g @vue/cli  -> vue-cli 다운로드 (vue-cli 미설치 시)
  ㄷ. vue create 프로젝트 파일명  -> vue 프로젝트 생성, package.json 생성 (예: vue create pjtName)
  ㄹ. cd 프로젝트 파일명  -> 프로젝트 폴더로 이동 (예: cd pjtName)
  ㅁ. npm install  -> package.json 의 라이브러리 다운로드


2, 프로젝트 실행
  ㄱ. vscode 우하단: Go Live 클릭 -> Live server 활성화
  ㄴ. 터미널에서 npm run serve 입력 -> vue 프로젝트 실행 (package.json 에서 각종 실행명령 확인 가능!)
  ㄷ. 브라우저에서 http://127.0.0.1:8080 입력 -> 프로젝트 화면 open
```

### router 적용
```
- 터미널에서 vue add router 입력 -> 설치 진행 중 Use history mode for router? N 설정


* router 란? vue에서 vue-page이동을 위한 주소지정

* history mode?
  - vue-page 이동 시 URL을 서버로 호출 -> SPA에 적합하지 않음
  https://happy-coding-day.tistory.com/entry/Vue-vue-router%EC%97%90%EC%84%9C-Hash-Mode-Vs-History-Mode-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
```

### axios 적용
```
- 터미널에서 npm install axios 입력 ->  package.json 에서 설치된 axios 버전 확인 가능

* axios 란?
  - node.js와 브라우저를 위한 Promise 기반 HTTP 비동기 통신 클라이언트 -> node_module이 필요
```

### axios 실습
```
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