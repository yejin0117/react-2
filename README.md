# react-2
<h1>202330117 송예진</h1>
<hr>

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
