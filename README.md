# create-next-app

next.js typescript 프로젝트생성

```
> npx create-next-app <폴더명> --typescript
```

# tailwind CSS 적용

1. tailwind CSS 설치
   [tailwind CSS 설치 링크](https://tailwindcss.com/docs/installation)

```
> npm install -D tailwindcss postcss autoprefixer
> npx tailwindcss init -p
```

npm : 패키지를 설치하는 명령어

npx : 패키지를 실행하는 명령어

2. 경로추가

```
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
```

3. globals.css에 지시문 추가

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. 시작

```
npm run dev
```
