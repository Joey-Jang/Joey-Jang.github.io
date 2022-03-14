---
title: 스프링부트(Gradle) + 리액트 앱(TypeScript) 연동하기
categories:
- IDE
tags:
- SpringBoot
- Gradle
- React
- TypeScript
---

백엔드는 스프링부트(Gradle), 프론트엔드는 리액트(TypeScript)로 프로젝트를 구성해야할 일이 생겼습니다.  
나중에 다시 헤매지 않도록 기록할 겸 정리해서 공유합니다.

## 스프링부트 프로젝트 생성

IntelliJ 또는 [Spring Initializr 웹사이트](https://start.spring.io)를 이용해 생성할 수 있습니다.

![caption](/assets/images/blog/img/2022-03-14-New-Project-Spring-Initializr.jpg "사진 1. File > New > Project...")

Type: Gradle, Packaging: Jar를 선택합니다.

![](/assets/images/blog/img/2022-03-14-New-Project-Dependencies.jpg "사진 2. version 2.6.4")

Dependencies에 Web > Spring Web를 추가해줍니다.

인텔리제이를 사용 중이지 않으시다면,  
[https://start.spring.io](https://start.spring.io)에서 위와 동일한 구성으로 프로젝트를 생성하시면 됩니다.

---

## 리액트 앱 생성

위에서 만든 스프링부트 프로젝트의 src/main 경로에서 Terminal(cmd)을 실행하고 다음 명령어를 입력합니다.

> npx create-react-app {앱 이름} &#45;&#45;template typescript

{앱 이름}에는 원하는 이름을 입력하시면 됩니다.

설치가 완료되면 아래 명령어를 입력해 리액트 앱를 구동해봅시다.

> cd {앱 이름}  
> npm start 또는 yarn start

![](/assets/images/blog/img/2022-03-14-React-App-Default.jpg "사진 3. 리액트 앱 초기 구동 화면")

위와 같이 타입스크립트 버전 리액트 앱이 구동되었다면 성공입니다.

다시 src/main/{앱 이름} 경로에서

> npm run build  
> npm run eject

를 실행합니다. eject 중 에러가 발생한다면 Commit/Push한 후 재시도합니다.

---

## 스프링부트 + 리액트 앱 연동

#### i. CORS 이슈 해결
기본적으로 스프링부트 백엔드 서버는 8080포트에서 실행되고, 리액트 앱 프론트엔드 서버는 3000포트에서 실행됩니다.  
프론트엔드 서버에서 백엔드 서버의 API를 호출할 때 CORS 이슈가 발생하기 때문에 프록시 설정을 해주어야 합니다.

{앱 이름}/package.json에

```json
"proxy": "http://localhost:8080"
```

를 추가해줍니다.

#### ii. {앱 이름}/build 하위의 모든 폴더, 파일 삭제

#### iii. build.gradle 수정 후 빌드

![](/assets/images/blog/img/2022-03-14-Setting-build-gradle.jpg "사진 4. 스프링부트 build에 리액트 앱 추가")

build.gradle에 아래 소스코드를 복붙합니다.

```python
def webappDir = "$projectDir/src/main/frontend"

sourceSets {
    main {
        resources {
            srcDirs = ["$webappDir/build", "$projectDir/src/main/resources"]
        }
    }
}

processResources {
    dependsOn "buildReact"
}

task buildReact(type: Exec) {
    dependsOn "installReact"
    workingDir "$webappDir"
    inputs.dir "$webappDir"
    group = BasePlugin.BUILD_GROUP
    if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
        commandLine "npm.cmd", "run-script", "build"
    } else {
        commandLine "npm", "run-script", "build"
    }
}

task installReact(type: Exec) {
    workingDir "$webappDir"
    inputs.dir "$webappDir"
    group = BasePlugin.BUILD_GROUP
    if (System.getProperty('os.name').toLowerCase(Locale.ROOT).contains('windows')) {
        commandLine "npm.cmd", "audit", "fix"
        commandLine 'npm.cmd', 'install'
    } else {
        commandLine "npm", "audit", "fix"
        commandLine 'npm', 'install'
    }
}
```

이제 내장 톰캣을 구동하면 *[사진 3](#리액트-앱-생성)*에서 봤던 리액트 앱이 8080포트에서 실행되는 모습을 볼 수 있습니다.

프론트엔드를 집중적으로 개발하실 때에는 npm start로 프론트엔드 서버를 따로 구동하여 3030포트에서 작업하시면 리액트가 실시간으로 변경점을 리로드해주기 때문에 편리합니다.

배포하실 때는 Gradle로 build를 올리면 build/libs에 생성되는 {프로젝트 이름}-0.0.1-SNAPSHOT.jar를 사용하시면 됩니다.

---

위 방식은 리액트 앱을 스프링부트로 감싸는 형식입니다.  
스프링의 MVC 구조에 익숙해서 그런지 스프링부트 서버와 리액트 앱 서버를 연동한다는 것이 낯설었습니다.

참고한 블로그의 [또 다른 글](https://sundries-in-myidea.tistory.com/112)을 보니 요즘은 백엔드 서버와 프론트엔드 서버를 분리해서 구성하는 것 같습니다.  
아직 스프링부트와 리액트에 익숙하지 못하기 때문에 조금 더 공부한 후에, 스프링부트 서버와 리액트 앱 서버를 독립적으로 구성해서 연동하는 방법도 다루도록 하겠습니다.

감사합니다.

---

## 참고

[https://hjjooace.tistory.com/entry/React-Spring-Gradle-Project-%EC%97%B0%EB%8F%99](https://hjjooace.tistory.com/entry/React-Spring-Gradle-Project-%EC%97%B0%EB%8F%99)  
[https://sundries-in-myidea.tistory.com/71](https://sundries-in-myidea.tistory.com/71)  


