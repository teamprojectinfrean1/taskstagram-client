# 일정타그램 Tasktagram 
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
![기술스텍](https://github.com/user-attachments/assets/84185e0a-4fb9-4fd5-a7bb-096b80622662)  
<br />

### Typescript를 선택한 이유
1. **타입 안정성** : Typescript는 컴파일 타임에 타입 오류를 잡아내어 런타임 오류를 줄일 수 있습니다. 
2. **명확한 타입 정의** : 매개변수, 반환값, 변수의 타입 등을 명확하게 정의하여 코드의 가독성과 유지 보수성을 높여줍니다.
3. **코드 리팩토링** : 타입 정보를 활용하여 안전하게 코드를 리팩토링할 수 있습니다.

저희는 위의 장점들을 활용해 오류를 사전에 방지하고, 프로젝트의 완성도를 높이기 위해 Typescript를 사용했습니다.  
<br />

### React Query를 선택한 이유
현재 리액트에서 45%로 가장 많은 사용률을 가지고 있는 상태 관리 라이브러리는 Redux입니다. Redux는 Flux 패턴을 사용하면서 단방향 데이터 흐름의 구조를 가지고 있는 상태 관리 라이브러리입니다.

**Redux의 단점**  
상태(state)를 더욱 쉽게 예측 가능하게 하여 유지보수 측면에 긍정적인 효과가 있지만, 몇 가지 단점이 존재합니다.

1. **복잡한 보일러 플레이트** : 다른 상태 관리 툴과 비교해 보았을 때 초기 보일러 플레이트를 구성하는 게 복잡합니다. ex) 액션 타입, 액션 생성 함수, 리듀서 등
2. **서버 데이터를 관리하기 쉽지 않다.** : Redux는 클라이언트 데이터를 관리하기에는 적합하지만, 서버 데이터를 관리하기에는 적합하지 않은 성향을 띄고 있습니다.

이러한 단점을 해결하기 위해 저희는 React Query를 사용했습니다.
React Query는 데이터 패칭, 캐싱, 동기화, 서버 데이터 업데이트 등을 쉽게 만들어주는 리액트 라이브러리입니다.

**React Query의 장점**  
1. Redux에 비해 보일러 플레이트가 적어 프로젝트 구조가 단순해집니다.
2. 캐싱 처리가 간단해집니다. 데이터의 상태를 자동으로 관리하며, 동일한 데이터를 여러 번 요청하지 않고 캐싱된 데이터를 사용하여 성능을 최적화합니다.
3. 데이터가 변경되었을 때 자동으로 데이터를 다시 패칭할 수 있습니다.  
<br />

### Recoil을 선택한 이유
React Query로 서버 데이터를 관리하더라도, 클라이언트 측에서 전역으로 관리해야 할 데이터는 존재할 것입니다. 이것을 고려하여 Recoil을 사용함으로써, 상태 관리 라이브러리가 본연의 역할에만 집중하도록 하였습니다.

Recoil을 선택한 이유는 다음과 같습니다.

1. React의 최신 기능들과의 통합이 잘 되어 있어, **사용성이 뛰어납니다.**
2. Recoil DevTools은 상태를 시각화하고 디버깅할 수 있는 도구를 제공하며, **복잡한 상태 관리에서 발생할 수 있는 문제를 쉽게 추적하고 해결하는데 도움을 줍니다.**
3. 상태를 작은 단위(atom)로 분리하여 관리할 수 있도록 설계되어 있으므로, **상태를 더 모듈화하고 재사용을 가능하게 합니다.**  
<br />

### Material UI를 선택한 이유
Material UI는 높은 수준의 UI를 빠르고 효율적으로 개발할 수 있는 UI 도구입니다. 저희가 Material UI를 선택한 이유는 다음과 같습니다.

1. **방대한 컴포넌트 제공**
2. **리액트와 높은 호환성**
3. **테마 커스터마이제이션** : 테마를 사용하여 애플리케이션의 전체 스타일을 쉽게 커스터마이징할 수 있습니다.

위와 같은 이유로 개발에서 중요한 부분을 차지하는 `디자인`을 쉽게 개발하면서, 기능 개발에 좀 더 비중을 두어 개발 속도를 향상하기 위해 선택하였습니다.  
<br />
<br />


## 📄 상세 기능
> **마이 페이지 관련 기능**
### 유저프로필 조회 및 수정

https://github.com/user-attachments/assets/546d56b9-2e15-4226-9243-71735043948d  

마이페이지에서 가입한 계정의 사용자 정보를 조회할 수 있습니다.
사용자는 이메일, 프로필 이미지, 비밀번호, 닉네임을 변경할 수 있습니다.  
<br />
<br />

> **로그인 회원가입 등 auth 관련 기능**
### 로그인 

https://github.com/user-attachments/assets/996f4c79-479e-44b4-8fa1-ec6d63ed79bc  

생성한 사용자의 아이디와 비밀번호를 입력하여 로그인을 할 수 있습니다. 

### 회원가입

https://github.com/user-attachments/assets/0e1edba4-419e-4027-84a8-c56639f2cc07

회원가입 시 작성 가능한 입력값은 이메일, 아이디, 비밀번호, 프로필 이미지, 닉네임을 통해 계정을 생성할 수 있습니다.

- 이메일과 아이디, 비밀번호는 필수로 입력해야 하며, 이메일과 아이디는 중복 검사를 마쳐야 합니다.
- 프로필 이미지와 닉네임은 사용자의 선택으로 작성할 수 있습니다.  

### 아이디 찾기

https://github.com/user-attachments/assets/06254020-a378-4a47-9075-9e609fbe64c3

가입한 계정의 이메일을 통해 인증을 완료하면, 아이디를 찾을 수 있습니다.  
<br />

### 비밀번호 재설정

https://github.com/user-attachments/assets/20c5251f-5859-44b2-a719-d77f663927bd

가입한 계정의 이메일을 통해 인증을 완료하면, 비밀번호를 새로 설정할 수 있습니다.  
<br />

### 카카오로그인

https://github.com/user-attachments/assets/0d4cb8b0-4e32-4d96-b393-e8e3ffd541f9  

카카오 아이디와 비밀번호를 입력하여 로그인을 할 수 있습니다.  
<br />
<br />

## 🏛️ 시스템 아키텍쳐
![시스템 아키텍처](https://github.com/user-attachments/assets/9eabf075-df6b-43a5-a487-de4494638c55)  
<br />
<br />


## 📂 디렉토리 구조
![폴더구조](https://github.com/user-attachments/assets/8b200289-e92e-43bb-b03d-137e2a15082a)  
<br />
<br />

## 🤔 개선이 필요한 부분
### 1. 실시간 변경 사항 알림
현재 이슈, 태스크, 프로젝트에서 변경이 발생할 때마다 멤버들에게 웹 내 알림이 제공되지 않고 있어, 변경 사항을 파악하기 어렵습니다. 이를 개선하기 위해, 프로젝트, 태스크, 이슈의 생성, 수정, 삭제와 댓글의 생성, 수정, 삭제 시에 알림을 제공하도록 기능을 강화하면 사용자들이 변경 사항을 놓치지 않고 프로젝트의 최신 상태를 정확히 파악할 수 있습니다. 이러한 알림 기능 강화는 작업 관리와 협업의 효율성을 크게 향상시킬 것입니다.
<br />

### 2. 댓글에 대한 답글
현재 이슈에 댓글을 달 수 있습니다. 그러나 답글 기능이 없어서, 사용자가 특정 댓글에 답을 하고 싶을 때 어떤 댓글에 대한 답인지 직접 언급해야 하는 불편함이 있습니다. 답글 기능을 추가하면 사용자들이 더 쉽게 대화를 이어갈 수 있고, 논의의 흐름을 명확하게 파악할 수 있어 편리할 것입니다.
<br />

### 3. 멤버 초대 수락 기능 필요성
현재 프로젝트에 웹 서비스 내 사용자를 자유롭게 추가할 수 있습니다. 그러나 사용자 입장에서는 예고 없이 새로운 프로젝트가 자신의 계정에 추가될 수 있어 혼란스러울 수 있습니다. 멤버를 초대할 때, 초대받은 멤버가 이를 수락하도록 하는 기능을 추가하면, 사용자 경험이 향상되고, 예기치 않은 추가를 방지할 수 있어 더 좋을 것 같습니다.
<br />

### 4. 프로젝트별 로드맵
![로드맵](https://github.com/user-attachments/assets/0d66b053-bf9e-4093-982f-373b7ca25e0b)

프로젝트별로 이슈보드에서 이슈의 진행 상황을 '할 일/진행 중/완료'로 확인할 수 있으며, 태스크 페이지에서는 '진행 중/완료' 상태의 태스크를 확인할 수 있습니다. 단위마다 상태를 명확히 보여줄 수 있도록 구상되었지만, 한눈에 파악하기에 힘든 부분이 있습니다. 각 프로젝트의 전체적인 진행 상황을 한눈에 파악할 수 있도록 직관적인 로드맵을 제공한다면 더욱 효과적일 것입니다. 
<br />

### 5. 프로젝트 분할

현재 이슈를 작성하기 위해서는 프로젝트 생성 → 태스크 생성 → 이슈 생성 을 할 수 있습니다.

대규모 프로젝트나 세분할이 잘 되어 있는 잘 되어 있으면 위와 같은 구조가 좋을 수 있겠지만, 소규모 프로젝트나 개인 프로젝트의 경우 구조가 세분화되어 있지 않기 때문에 태스크를 필수로 생성하지 않더라도 이슈를 생성할 수 있게 하면 사용자 측면에서 좀 더 편한 서비스를 이용할 수 있을 것입니다.  
<br />
<br />

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

