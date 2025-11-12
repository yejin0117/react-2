# react-2
<h1>202330117 송예진</h1>
<hr>

## 🔖 11월 12일 (12주차)
<h2> 3. 스트리밍 > 3-1. loading.tsx를 사용하는 방법 </h2>

- Suspense는 page의 어떤 부분을 스트리밍할지 더욱 세부적으로 설정할 수 있음
- 서스펜스 경계를 벗어나느 모든 페이지 콘텐츠를 즉시 표시하고, 경계 안에 있는 블로그 게시물 목록을 스트리밍할 수 있음

<h2> 문서 코드 수정 및 lib 생성 </h2>

- page에서 Suspense, getArtist, getArtistPlaylists를 import
- getArtist(username)생성
- Next.js 서버 환경에서 fetch를 사용하므로 page.tsx에서 await/비동기 호출로 바로 사용 가능

## 🔖 11월 5일 (11주차)
<h2>데이터 가져오기</h2>

- fetch 응답은 기본적으로 캐싱되지 않음
- 개발 중에는 가시성과 디버깅을 개선하기 위해 fetch 호출을 기록할 수 있음
- 서버 컴포넌트는 서버에서 렌더링 되기 때문에 ORM이나 데이터베이스 클라이언트를 사용해서 안전하게 데이터베이스 쿼리를 실행할 수 있습니다.
- 컴포넌트를 비동기 함수로 변환하고 호출을 기다리면 됨
- 클라이언트 컴포넌트에서 데이터를 fetch하는 방법은 두가지
1. React의 use Hook
2. SWR 또는 React 쿼리같은 통신 라이브러리

**1-2. 클라이언트 컴포넌트**
<br>

1-2. 클라이언트 컴포넌트
- 클라이언트 컴포넌트에서 데이터를 fetch하는 방법은 두가지가 있습니다.
    1. React의 use Hook
    2. SWR 또는 React 쿼리와 같은 통신 라이브러리

[1. use Hook을 사용한 스트리밍 데이터]
- React의 use Hook을 사용하여 서버에서 클라이언트로 데이터를 스트리밍합니다.
- 서버 컴포넌트에서 데이터를 먼저 fetch하고, 그 결과(promise)를 클라이언트 컴포넌트에 prop으로 전달합니다.
- ⚠️ 서버 컴포넌트는 async가 가능하기 때문에 await fetch()도 사용 가능합니다.
- ⚠️ 하지만 클라이언트 컴포넌트에서는 async가 불가능하기 때문에 직접 fetch가 불가능합니다. (렌더링 중 fetch 금지)

**Fetch의 이해**
<br/>

- 실습한 코드에서 fetch(url).then((res) => res.json()) 이라는 부분이 있습니다.
- 이 부분에 대해서 좀 더 이해하고 넘어가도록 하겠습니다.

fetch(url)
- fetch() 함수는 브라우저의 Fetch API로, HTTP 요청을 보낼 때 사용합니다.
- 기본적으로 GET 방식으로 요청을 수행합니다.
- 첫 번째 인자로 요청(request)할 URL, 두 번째 인자로 요청 옵션을 전달합니다.
- 옵션은 method, headers, body 등이 있습니다.
- Promise<Response> 객체를 반환합니다.
- 응답이 도착하면 then()을 통해 결과를 처리합니다.
- HTTP 상태 코드가 4xx / 5xx 이어도 Promise는 reject(오류)되지 않습니다.
- 네트워크 에러(통신 오류)가 아니라면 무조건 resolve가 됩니다.
- 따라서 404, 500 등의 오류를 처리하려면 예외처리가 별도로 필요합니다.
<br/>

1. Promise의 기본 구조
    - new Promise()를 호출하면 Promise 객체가 생성됩니다.
    - 생성자의 인자로 callback 함수가 들어가는데, 이 call back은 두 개의 매개변수를 받습니다.
        - resolve: 작업이 성공했을 때 호출하는 함수
        - reject: 작업이 실패했을 때 호출하는 함수

2. resolve()의 기능
    - resolve(value)는 Promise의 상태를 "fullfilled(이행됨)"으로 바꾸고, 그 값(value)을 .then()으로 전달합니다.
    - 예에서는 resolve('완료'!)를 호출한 순간, promise의 상태는 "fullfilled"로 바뀌고 result로 '완료!'가 전달됩니다.

3. 자주 혼동하는 부분
    - resolve는 Promise 안에서 자동으로 전달되는 함수입니다.
    - 직접 정의하는 게 아니라 new Promise 내부 callback의 첫번째 매개변수로 주어집니다.
    - 다음 코드는 잘못된 예시를 보여줍니다.

4. 이미 존재하는 Promise를 resolve하는 경우
    - 경우에 따라서 새 Promise를 만들지 않고, 이미 존재하는 값을 "즉시 이행된 Promise"로 감싸고 싶을 때가 있습니다.
    - 이런 경우 Promise.resolve()를 사용합니다.
    - 이것은 new Promise((resolve) => resolve('이미 완료된 값'))와 같은 의미입니다.
<br/>

💡 .then((res) => ...)
- fetch()가 반환한 Promise 객체가 then() 메서드를 가지고 있습니다.
- Promise 객체가 resolve(성공)되면 .then()의 callback 함수가 실행됩니다.
- 여기서 res는 서버에서 반환된 Promise 객체입니다.
- Promise 객체는 status, header, body 등 HTTP 응답 전체를 포함합니다.
<br/>

💡 res.json()
- res.json()은 이 Response 객체의 본문(body)을 JSON으로 파싱하는 비동기 함수입니다.
- 내부적으로 문자열 형태의 Response body를 읽고, JSON.parse()를 수행하여 자바스크립트 객체로 변환합니다.
- 이 함수로 Promise를 반환하기 때문에 다시 then() 체이닝을 통해 파싱된 데이터를 사용할 수 있습니다.
- 파싱이 완료되면 resolve(성공)되고, 파싱에 실패(유효하지 않은 JSON)하면 reject(거부)됩니다.
<br/>

**Suspense Component란 무엇인가?**
- 비동기 작업 중에 UI의 일부를 일시적으로 대체 UI(fallback)로 보여주어 사용자 경험을 향상시키는 React 기능입니다. (예: 데이터 로딩, 컴포넌트 동적 임포트)
<br/>

[Suspense의 핵심 기능]
- 비동기 작업이 완료될 때까지 해당 컴포넌트 트리 렌더링을 일시 중지합니다.
- 작업이 완료되면 실제 UI로 자동 전환합니다.
- 비동기 로딩 중 보여줄 fallback UI(로딩 인디케이터 등)를 지정할 수 있습니다.
- import 하여 사용합니다. ```import { Suspense } from 'react'```

- Suspense 내부에 여러 개의 컴포넌트가 있을 경우, 내부 컴포넌트 중 하나라도 로딩 중이면 fallback UI가 표시되고, 모든 작업이 완료되면 한번에 실제 UI가 노출됩니다.
- 이 기능을 활용하면 여러 비동기 컴포넌트를 독립적으로 대기하거나, 병렬 로딩 상태를 효과적으로 관리할 수 있습니다.

**Promise<...>란 무엇인가?**
<br/>

- Next.js 15.1부터 주요 내부 API들이 비동기(Promise 기반) 구조로 변경되었습니다.
- 내부 API(예: params, searchParams, headers, cookies)가 즉시 사용 가능한 값이 아니라 비동기적으로 처리되며 Promise를 반환하게 됩니다.
- 즉 Promise<...>는 비동기 연산의 결과를 나타내는 객체 타입으로, 연산이 즉시 완료되지 않고 미래의 어느 시점에서 결과가 결정될 때 이를 표현한다는 의미입니다.
- Promise<{ id: string }>는 미래에 { id: string } 객체를 반환하겠다는 약속입니다.
- 즉, 서버 컴포넌트로부터 Promise<{ id: string }> 객체를 받았다면, 클라이언트 컴포넌트에서는 use Hook을 사용해서 개별 데이터에 접근합니다.

**서버 컴포넌트에서 getPosts() 함수를 사용**
<br/>

[데이터의 전체적인 흐름]
1. blog에 접속하면 getPosts 라이브러리를 호출하여 fetch 정보를 전달 합니다.
2. getPosts는 받은 정보를 이용하여 fetch 데이터를 가져온 후 json 형태로 blog에 return 합니다.
3. blog는 getPosts로부터 받은 데이터를 Posts 컴포넌트에 props로 전달합니다.
4. 이때 blog는 Posts로부터 데이터를 받을 때까지 Suspense로 fallback UI를 실행합니다.
5. Posts 컴포넌트는 받은 props를 use Hook을 사용하여 데이터를 저장합니다.
6. 저장된 데이터는 map 함수를 사용하여 list를 만들고 그 결과를 blog로 return 합니다.
7. list를 받으면 blog는 fallback UI 실행을 중지하고 즉시 list를 렌더링합니다.
<br/>

**1-4. 커뮤니티 라이브러리(서드파티(third-party) 라이브러리 및 도구)**
<br/>

- 클라이언트 컴포넌트의 fetch data는 SWR 또는 React Query와 같은 커뮤니티 라이브러리를 사용할 수 있습니다.
    - SWR(Stale-While-Revalidate): Vercel에서 만든 라이브러리로, 먼저 캐시된(stale / 오래된) 데이터를 빠르게 보여준 후, 백그라운드에서 최신 데이터(revalidate)를 다시 가져옵니다. 그리고 최신 데이터가 도착하면 자동으로 화면을 업데이트합니다.

- 이런 라이브러리는 캐싱, 스트리밍 및 기타 기능에 대한 자체적인 의미(semantics)를 가지고 있습니다. 예를 들어 SWR을 사용한 예제는 다음과 같습니다.
<br/>

**제네릭(T)을 사용하여 반환 값의 타입을 명시적으로 지정**
<br/>

- 이 경우 반환 타입을 타입스크립트가 추론합니다. fetch(url).then((r) => r.json())의 결과는 일반적으로 Promise<any> 또는 Promise<unknown>로 추론됩니다.
- 문제는 any나 unknown으로 추론될 경우, 이 함수를 사용하는 쪽에서는 데이터의 실제 구조(r.name, r.id 등)를 알 수 없기 때문에, 사용할 때마다 타입을 명시하거나 별도의 타입 가드를 사용해야 합니다.
- 결과적으로 타입 안정성이 낮아져 런타임 오류의 가능성이 높아집니다.
- 이를 해결하기 위해서 TypeScript에서는 Generic을 제공합니다.
<br/>

**2. 중복된 요청 제거 및 데이터 캐시**
<br/>

- 중복된 fetch 요청을 제거하는 한가지 방법은 요청 메모이제이션(request memoization)을 사용하는 것입니다.
    - ⚠️ 즉, 같은 데이터를 여러번 요청하지 않게 하려면, '요청 메모이제이션(request memoization)'을 사용할 수 있다는 의미입니다.
- 이 메커니즘(요청 메모이제이션)을 사용하면, 하나의 렌더링 과정(single render pass) 안에서 같은 URL과 옵션을 가진 GET 또는 HEAD 방식의 fetch 호출들은 하나의 요청으로 결합된다.
    - ⚠️ 즉, 렌더링 중에 같은 주소와 설정으로 여러번 fetch()를 호출하더라도, Next.js는 그런것들을 하나의 네트워크 요청으로 통합해서 처리한다는 의미입니다.
- 이 작업은 자동으로 수행되며, fetch에서 Abort 신호를 전달하여 작업을 취소(opt out)할 수 있습니다.
- 요청 메모이제이션은 요청의 수명에 따라 범위가 지정됩니다.
- Next.js의 데이터 캐시를 사용하여 fetch 중복을 제거할 수도 있습니다. 예를 들어, fetch 옵션에서 cache: 'force-cache'를 설정합니다.
- 데이터 캐시를 사용하면 현재 렌더 패스와 수신 요청에서 데이터를 공유할 수 있습니다.
- ⚠️ 예제의 테스트를 정상적으로 테스트하기 위해서는 2가지 패키지가 필요합니다.
    - Drizzle-orm: SQL 데이터베이스를 위한 TypeScript 기반 ORM
    - better-sqlite3: Node.js 환경에서 SQLite 기반


## 🔖 10월 29일 (10주차)
<h2>Context provider</h2>

- RootLayout 수정 코드 설명 - server 컴포넌트
- ThemeStatus는 출력을 원하는 곳에 삽입
- 문서의 설명으로는 {children}을 감싸면 최적화 할 수 있다고 되어 있지만 우리의 경우에는 동작하지 않음 => 왜냐면 우린 css의 속성 선택자로 html을 사용했기 때문

<h2>2. Provider 배치</h2>

- RootLayout에서 ThemeProvider로 루트를 감싸줌


<h2>3. Consumer 사용(theme-status.tsx)</h2>

<h2>외부(서드 파티) component</h2>

- client component에 래핑하여 예상대로 작동하는지 확인
- useState를 사용하지만 "use client" 지시문은 없음
- client component 내에서 사용하면 예상대로 작동

<h2>npm i acme-carousel</h2>
  

## 🔖 10월 22일 (9주차)
<h2> server 및 client component 인터리빙</h2>

- client의 state를 사용하여 표시 여부를 전환하는 모달 컴포넌트 안에 server에서 데이터를 가져오는 카트 컴포넌트가 있음
- 모든 server component가 server에서 미리 렌더링됨
- client component가 렌더링되어야 하는 위치에 대한 참조가 포함됨

<h2>Context란 무엇인가?</h2>

- 전역 상태 관리
- props drilling 문제 해결
- React 컴포넌트에서 사용
- 클라이언트 컴포넌트
- 서버 컴포넌트
- 성능

<h2>Context provider (컨텍스트 제공자)</h2>

- React Context는 일반적으로 아래 테마처럼 전역 상태를 공유하는데 사용됨
- server component에서는 React Context가 지원되지 않음
- Provider component를 트리에서 가능한 한 깊숙이 렌더링해야함
- ThemeProvider가 전체 Html 문서 대신 children만 래핑하는 방식 주목
- 속성선택자(Attribute Selector)로 CSS에서 클래스(.class)나 아이디(#id)처럼 요소를 선택하는 또 다른 방법
- class를 여러 개 붙이는 경우보다 스타일 충돌 줄임

## 🔖 10월 17일 (8주차)
<h2> Intrduction </h2>

- 기본적으로 layout과 page는 server component입니다.
- serve에서 데이터를 가져와 UI의 일부를 렌더링할 수 있고, 선택적으로 결과를 cache한 후 client로 스트리밍할 수 있음
- 상호작용이나 브라우저 API가 필요한 경우 client component를 사용하여 기능을 계층화할 수 있음
- 이번 장에서는 Next.js에서 server 및 client component가 작동하는 방식과 이를 사용하는 시기를 설명하고, 애플리케이션에서 이 컴포넌트를 사용하는 방법에 대한 예제를 소개합니다.

<h2> server 및 client component를 언제 사용해야 하나요? </h2>

- server 및 client component를 사용하면 사용하는 사례에 따라 각각의 환경에서 필요한 로직을 실행할 수 있음
- 다음과 같은 항목이 필요할 경우에는 client component를 사용함
1. state 및 event handler
2. Lifecycle logic
3. 브라우저 전용 API
4. 사용자 정의 Hook

- 다음과 같은 항목이 필요할 경우엔 server component 사용
1. 서버의 데이터베이스 혹은 API에서 server component를 사용
2. 보안 데이터를 client에 노출하지 않고 사용
3. 브라우저로 전송되는 JavaScript의 양을 줄이고 싶을 때 사용
4. 콘텐츠가 포함된 첫 번째 페인트(First Contentful Paint-FCP)를 개선하고, 콘텐츠를 client에 점진적으로 스트리밍

<h2>3-2 JS bundle 크기 줄이기</h2>

- UI의 큰 부분을 client component로 표시하는 대신 특정 대화형 component에 "use client"로 추가
- <Layout> component는 로고와 탐색 링크와 같은 정적 요소가 대부분이지만 대화형 검색창이 포함되어 있습니다.
- <Search />는 대화형이기 때문에 client component가 되야 하지만, 나머지 layout은 server component로 유지될 수 있음
- # 나머지 layout은 server component로 유지해야함.

## 🔖 10월 1일 (6주차)
<h2> Client-side transitions(클라이언트 측 전환)</h2>

- 서버 렌더링 페이지로 이동하면 전체 페이지가 로드됨
- 이로 인해 state가 삭제되고, 스크롤 위치가 재설정되며, 상호작용이 차단됨
- <Link> 컴포넌트를 사용하는 클라이언트 측 전환을 통해 이를 방지
 콘텐츠를 동적으로 업데이트
-  공유 레이아웃과 UI를 유지
- 미리 가져온 로딩 상태 또는 사용 가능한 경우 새 페이지
- 서버에서 렌더링된 앱을 클라이언트에서 렌더링된 앱처럼 느껴지게 하는 요소
- 프리패칭 및 스트리밍과 함께 사용하면 동적 경로에서도 빠른 전환 가능

<h2> generateStaticParams가 없는 경우와 있는 경우 비교</h2>

- 없는 경우 Next.js는 slug값을 빌드 타임에는 모르는 상태
- 요청할 때마다 해당 페이지를 동적으로 렌더링
- 있는 경우 빌드타입에 생성할 slug 목록을 알려줌
- 정적html+ json 빌드 타임이 생성, 최초 접근 시 SSR이 필요 없이 미리 만들어진 페이지 제공

<h2> 느린 네트워크 </h2>

- 클릭하기 전에 프리페칭이 완료되지 않을 수 있음
- 정적 경로와 동적 경로 모두 영향
- loading.tsx 파일이 아직 프리페칭되지 않았기 때문에 즉시 표시되지 않을 수 있음
- useLinkStatus Hook을 사용




## 🔖 9월 24일 (5주차)
<h2> searchParams란? </h2>

- url의 쿼리 문자열을 읽는 방법
- searchParams는 컴포넌트의 props로 전달되며, 내부적으로는 URLSearchParams처럼 작동함

<h2> Linking between pages(페이지 간 연결) </h2>

- <Link> 컴포넌트를 사용하여 경로 사이를 탐색
- HTML <a>태그를 확장하여 prefetching 및 client-side navigation 기능을 제공하는 
 
<h2> 초입 </h2>

- 경로는 기본적을 서버에서 렌더링됨
- 새 경로를 표시하기 전에 서버의 응답을 기다려야 하는 경우가 많음
- perfetching, streaming, client-side-transition(클라이언트 사이드 전환) 기능이 기본 제공되어 네비게이션 속도가 빠르고 반응성이 뛰어남
- 네비게이션이 작동하는 방식, 동적 라우트와 느린 네트워크에 맞게 네비게이션을 최적화하는 방법을 설명

<h2>Streaming(스트리밍)</h2>

- 전체 경로가 렌더링될 때까지 기다리지 않고, 동적 경로의 일부가 준비되는 즉시 클라이언트에 전송할 수 있음
- 동적 경로의 경우, 부분적으로 미리 가져올 수 있다는 뜻
- 공유 레이아웃과 로딩 스켈레톤을 미리 요청


## 🔖 9월 17일 (4주차)
<h2>git checkout vs git switch 차이</h2>

- checkout은 브랜치를 이동하고 파일도 바꿀 수 있음. 실수할 위험성 있음
- switch는 브랜치만 이동. 안전하게 사용 가능
- switch는 이미 작성된 commit을 조작하는 것만 할 수 없는 것이지 나머지 작업, 즉 파일을 작성하고, 수정하고, 커밋하는 것은 가능
- 특별한 이유가 없다면 switch 사용

<h2>Creating a nested route(중첩 라우트 만들기)</h2>
- 중첩 라우트는 다중 URL 세그먼트로 구성된 라우트입니다.

### [Next.js에서]
- 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 정의하는데 사용됨. 즉, 폴더가 URL 세그먼트가 됨
- 파일은 세그먼트에 표시되는 UI를 만드는 데 사용됨
- 폴더를 중첩하면 중첩된 라우트를 만들 수 있음

<h2>3. Creating a nested route(중첩 라우트 만들기)</h2>
- 폴더를 계속 중첩하여 중첩된 경로 생성 가능
- 블로그 게시물에 대한 경로를 만드려면 blog 안에 새 [slug] 폴더를 만들고 page  파일을 추가
- 폴더 이름을 대괄호로 묶으면 데이터에서 여러 페이지를 생성하는데 사용되는 동적 경로 세그먼트가 생성됨

<h2>6. Rendering with search params(검색 매개변수를 사용한 렌더링)</h2>
- 서버 컴포넌트를 page에서는 searchParams prop을 사용하여 검색 매개변수에 액세스
- searchParams를 사용하면 해당 페이지는 동적 렌더링 처리됨
- URL의 쿼리 파라미터를 읽기 위해 요청이 필요하기 때문


## 🔖 9월 10일 (3주차)
<h2>1. Folder and file conventions(폴더 및 파일 규칙)</h2>

###  [최상위 폴더] Top-level folders
- 최상위 폴더는 애플리케이션의 코드와 정적 자산을 구성하는 데 사용됨

###  [최상위 파일] Top-level files
- 최상위 파일은 애플리케이션 구성, 종속성 관리, 미들웨어 실행, 모니터링 도구 통합, 환경 변수 정의에 사용

<h2>2. Organizing your project(프로젝트 구성하기)</h2>

- Next.js는 프로젝트 파일을 어떻게 구성하고 어디에 배치할지에 대한 제약이 없음

<h2>layout과 template의 차이</h2>

- layout: 경로별 공유 레이아웃, 상태/dom 유지됨 (정적), 네비게이션,사이드바, 공통 레이아웃
- template: 매번 새 인스턴스 생성, 상태/dom 유지됨 초기화됨(동적), 페이지별로 초기화가 필요한

- component는 중첩된 라우팅에서 재귀적으로 렌더링 됨
- 즉, 라우팅 세그먼트의 component는 부모 세그먼트의 component 재부에 중첩됨
- 세그먼트는 나누어진 각 부분, 분할된 부분, 또는 특정 기준에 따라 분류된 그룹을 의미
- 즉, 프로젝트 파일을 app 디렉토리의 라우팅 세그먼트 내에 안전하게 배치하여 실수로 라우팅되지 않도록 할 수 있음
- 원한다면 app 디렉토리 외부에 보관할 수도 있음
- app 디렉토리의 파일은 기본적으로 안전하게 코로케이션 될 수 있으므로, 코로케이션에 비공개 폴더는 불필요함.
- UI 로직과 라우팅 로직을 분리
- 내부 파일을 일관되게 구성
- 파일을 정렬하고 그룹화
- 이름 충돌을 방지

### 알아두면 좋은 정보
- 밑줄 패턴을 사용하여 비공개 폴더 외부의 파일을 "비공개"로 표시
- 비공개 폴더를 사용하지 않는 경우, 예상치 못한 이름 충돌 방지를 위해 Next.js의 특수 파일 규칙을 아는것이 좋음


###  [라우팅 그룹] Route groups
- 폴더를 괄호로 묶어 라우팅 그룹을 만들 수 있음(folderName)
- 구성 목적을 사용되는 것을 의미, 라우터의 URL 경로에 포함되지 않아야 함

- 파일을 어떻게 구성하고 어디에 배치할지에 대한 제약이 없음
- 도움이 되는 몇 가지 기능을 제공

## 🔖 9월 3일 (2주차)
<h2>Installation</h2>

- 명령팔레트 -> "TypeScript: TypeScript 버전 선택" -> select version
- Next.js에는 ESLint가 내장되어 있음
- 기존 프로젝트에 ESLint를 수동으로 추가하려면 package.json에 next lint 스크립트를 추가해야함 <br>
<p style="
color: black;background:#cfcfcf;
border-radius:5px;
padding:15px;
">
{<br>
&emsp; "scripts": {<br>&emsp;&emsp;&emsp;
            "lint": "next lint"<br>
&emsp;&emsp;&emsp;    }<br>
}
</p>
#### 7. import 및 모듈의 절대 경로 별칭 설정
- Next.js에는 tsconfig.json 및 jsconfig.json 파일의 "paths" 및 "baseUrl" 옵션에 대한 지원을 내장
- 프로젝트 디렉터리를 절대 경로로 별칭하여 모듈을 더 쉽고 깔끔하게 가져올 수 있음

#### 부트스트랩 이용

### Core Web Vitals
- LcP: 뷰포트 내에서 가장 큰 페이지 요소를 표시하는데 걸리는 시간
- FID: 사용자가 웹페이지와 상호작용을 시도하는 첫 번째 순간부터 웹페이지가 응답하는 순간
- CLS: 방문자에게 콘텐츠가 얼마나 불안정한 지 측정한 값, 레이아웃 이동 빈도를 측정

### 하드링크 vs 심볼릭 링크

#### 하드링크
- Directory Entry: 파일 이름과 해당 inode 번호를 매핑 정보가 있는 특수한 파일
- inode: 파일 또는 디렉토리에 대한 모든 메타데이터를 저장하는 구조체

#### 심볼릭 링크
- 경로 문자열을 저장해 두는 특수 파일
- 경로를 따라가서 원본 파일을 찾음
- 원본이 삭제되면 심볼릭 링크는 끊어진 경로가 되므로 더 이상 사용할 수 없음
- 윈도우의 바로 가기 파일과 비슷하게 생각할 수 있음

### 실습에 사용할 프로젝트 생성
1. 프로젝트 이름 입력
2. TypeScript, ESLint, Tailwind를 사용할지 선택
3. src/디렉토리 사용할지 선택
4. App Router 사용할지 선택
5. import alias 사용할지 선택
6. alias 문자를 지정 기본은 @/*

## 🔖 8월 27일 (1주차)
- OT진행
- 프로그램 설치
