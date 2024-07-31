# 일정타그램 Tasktagram 

<br />

일정타그램은 Kanban 보드 스타일의 협업 관리 웹 애플리케이션으로, '할 일', '진행 중', '완료' 단계로 팀의 작업 흐름을 시각적으로 파악할 수 있습니다. 팀원들은 Instagram 스토리에서 영감을 받은 소셜 기능을 통해 각 팀원들이 현재 진행 중인 작업이 있는지를 한 눈에 확인할 수 있으며, 이를 통해 팀원 간의 효율적인 소통과 협업을 지원합니다.

<br />
<br />

### 🔗 배포된 웹사이트 : https://taskstagram.info/

<br />
<br />

# 목차

#### [🔧 기술 스택](#-기술-스택)
  - [Typescript를 선택한 이유](#typescript를-선택한-이유)
  - [Material UI를 선택한 이유](#material-ui를-선택한-이유)
  - [Recoil을 선택한 이유](#recoil을-선택한-이유)
  - [React Query를 선택한 이유](#react-query를-선택한-이유)
#### [📄 상세 기능](#-상세-기능)
#### [🏛️ 시스템 아키텍쳐](#-시스템-아키텍쳐)
#### [📂 디렉토리 구조](#-디렉토리-구조)
#### [🤔 개선이 필요한 부분](#-개선이-필요한-부분)
#### [🧑‍🧑‍🧒‍🧒 팀원 소개](#-팀원-소개)

<br />
<br />

## 🔧 기술 스택
### Frontend
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
<br />

### Backend
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
<br />

### Tools
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br />

### Collaboration
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
<br />

### Deploy
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### Typescript를 선택한 이유
1. <strong>타입 안정성</strong> : Typescript는 컴파일 타임에 타입 오류를 잡아내어 런타임 오류를 줄일 수 있습니다. <br />
2. <strong>명확한 타입 정의</strong> : 매개변수, 반환값, 변수의 타입 등을 명확하게 정의하여 코드의 가독성과 유지 보수성을 높여줍니다. <br />
3. <strong>코드 리팩토링</strong> : 타입 정보를 활용하여 안전하게 코드를 리팩토링할 수 있습니다. <br />

저희는 위의 장점들을 활용해 오류를 사전에 방지하고, 프로젝트의 완성도를 높이기 위해 Typescript를 사용했습니다. <br />  

### React Query를 선택한 이유
현재 리액트에서 45%로 가장 많은 사용률을 가지고 있는 상태 관리 라이브러리는 Redux입니다. Redux는 Flux 패턴을 사용하면서 `단방향 데이터 흐름`의 구조를 가지고 있는 상태 관리 라이브러리입니다. <br />

<strong>Redux의 단점</strong> <br />
상태(state)를 더욱 쉽게 예측 가능하게 하여 유지보수 측면에 긍정적인 효과가 있지만, 몇 가지 단점이 존재합니다.

1. <strong>복잡한 보일러 플레이트</strong> : 다른 상태 관리 툴과 비교해 보았을 때 초기 보일러 플레이트를 구성하는 게 복잡합니다. ex) 액션 타입, 액션 생성 함수, 리듀서 등
2. <strong>서버 데이터를 관리하기 쉽지 않다.</strong> : Redux는 클라이언트 데이터를 관리하기에는 적합하지만, 서버 데이터를 관리하기에는 적합하지 않은 성향을 띄고 있습니다.
<br />

이러한 단점을 해결하기 위해 저희는 React Query를 사용했습니다. <br />
`React Query`는 데이터 패칭, 캐싱, 동기화, 서버 데이터 업데이트 등을 쉽게 만들어주는 리액트 라이브러리입니다. <br /><br />
<strong>React Query의 장점</strong> <br />
1. Redux에 비해 보일러 플레이트가 적어 프로젝트 구조가 단순해집니다.
2. 캐싱 처리가 간단해집니다. 데이터의 상태를 자동으로 관리하며, 동일한 데이터를 여러 번 요청하지 않고 캐싱된 데이터를 사용하여 성능을 최적화합니다.
3. 데이터가 변경되었을 때 자동으로 데이터를 다시 패칭할 수 있습니다.

### Recoil을 선택한 이유
React Query로 서버 데이터를 관리하더라도, 클라이언트 측에서 전역으로 관리해야 할 데이터는 존재할 것입니다. 이것을 고려하여 Recoil을 사용함으로써, 상태 관리 라이브러리가 본연의 역할에만 집중하도록 하였습니다. <br />

Recoil을 선택한 이유는 다음과 같습니다. <br />
1. React의 최신 기능들과의 통합이 잘 되어 있어, <strong>사용성이 뛰어납니다.</strong>
2. Recoil DevTools은 상태를 시각화하고 디버깅할 수 있는 도구를 제공하며, <strong>복잡한 상태 관리에서 발생할 수 있는 문제를 쉽게 추적하고 해결하는데 도움을 줍니다.</strong>
3. 상태를 작은 단위(atom)로 분리하여 관리할 수 있도록 설계되어 있으므로, <strong>상태를 더 모듈화하고 재사용을 가능하게 합니다.</strong>

### Material UI를 선택한 이유
Material UI는 높은 수준의 UI를 빠르고 효율적으로 개발할 수 있는 UI 도구입니다. 저희가 Material UI를 선택한 이유는 다음과 같습니다. <br />
1. <strong>방대한 컴포넌트 제공</strong>
2. <strong>리액트와 높은 호환성</strong> 
3. <strong>테마 커스터마이제이션</strong> : 테마를 사용하여 애플리케이션의 전체 스타일을 쉽게 커스터마이징할 수 있습니다.

위와 같은 이유로 개발에서 중요한 부분을 차지하는 `디자인`을 쉽게 개발하면서, 기능 개발에 좀 더 비중을 두어 개발 속도를 향상하기 위해 선택하였습니다.

## 📄 상세 기능



## 🏛️ 시스템 아키텍쳐



## 📂 디렉토리 구조



## 🤔 개선이 필요한 부분



## 🧑‍🧑‍🧒‍🧒 팀원 소개
<table>
  <tbody>
    <tr>
      <td rowspan="3" style="background-color: #f5f5f5;"><strong>Frontend</strong></td>
      <td>박수빈</td>
      <td><a href="mailto:sooparksb@gmail.com">sooparksb@gmail.com</a></td>
      <td>
        <a href="https://github.com/sooparkdev">
          <img src="https://img.shields.io/badge/GitHub-ED8B00?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 박수빈" style="background-color: #ED8B00;" />
        </a>
      </td>
    </tr>
    <tr>
      <td>정석호</td>
      <td><a href="mailto:sfdjsh@naver.com">sfdjsh@naver.com</a></td>
      <td>
        <a href="https://github.com/sfdjsh">
          <img src="https://img.shields.io/badge/GitHub-8E44AD?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 정석호" style="background-color: #8E44AD;" />
        </a>
      </td>
    </tr>
    <tr>
      <td>마효리</td>
      <td><a href="mailto:hyori100@gmail.com">hyori100@gmail.com</a></td>
      <td>
        <a href="https://github.com/hyori100">
          <img src="https://img.shields.io/badge/GitHub-0094D8?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 마효리" style="background-color: #0094D8;" />
        </a>
      </td>
    </tr>
    <tr>
      <td><strong>Backend</strong></td>
      <td>전창준</td>
      <td><a href="mailto:jcjk0302@gmail.com">jcjk0302@gmail.com</a></td>
      <td>
        <a href="https://github.com/ondjj">
          <img src="https://img.shields.io/badge/GitHub-00A86B?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 전창준" style="background-color: #00A86B;" />
        </a>
      </td>
    </tr>
    <tr>
      <td><strong>Designer</strong></td>
      <td>윤소은</td>
      <td><a href="mailto:thdmadns@gmail.com">thdmadns@gmail.com</a></td>
      <td>
        <a href="https://github.com/Dubabbi">
          <img src="https://img.shields.io/badge/GitHub-FB6C6C?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub - 윤소은" style="background-color: #FB6C6C;" />
        </a>
      </td>
    </tr>
  </tbody>
</table>

