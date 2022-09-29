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

2. tailwind.config.js에 경로추가

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

4. Tailwind CSS IntelliSense 확장프로그램 설치

5. 시작

```
npm run dev
```

# prisma

database ORM 이다.

1. VScode `prisma` 확장프로그램 설치

2. `prisma` 패키지 설치

```
> npm i prisma -D
> npx prisma init
```

`.prisma/schema.prisma` 파일이 자동으로 생성

`.env` 파일이 생성됨

`.gitignore` 파일에 `.env`를 추가

3. `prisma` 초기설정

```
// .env
DATABASE_URL=<내 데이타베이스주소>
```

prisma/schema.prisma 파일 설정

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb" // <= 사용할 데이터베이스 지정
  url      = env("DATABASE_URL")
}
```

4. 대이터베이스에 스키마 업로드

```
model Post { // 예제
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  title    String
  body     String
  createAt DateTime @default(now())
  usdateAt DateTime @updatedAt
}
```

```
npx prisma db push // push
```

5. prisma studio 실행 (데이터베이스 웹 클라이언트)
   명령어가 실행중에만 접속할 수 있음

```
npx prisma studio
```

설치 후 종모양 클릭 후 확장프로그램 선택

6. `prisma` client 설정

```
> npx prisma generate
```

# prisma_create

```
  const User = await client.user.create({
      data: { name: "aaaa", age: 55, address: "아산시" },
    });
    res.status(200).json({ name: "aaaaaaaaaaaaaaaaaaaa" });
  } catch (err) {
    res.status(200).json({ name: "nononononono" });

    //await를 사용하려면
    //아래와 같이 async를 작성해줘야함
    export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
)
```

# prisma_CRUD

[CRUD 관련 사이트](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

# prisma_read

```
interface ResponseDataType { // typescript형 지정
  name: String;
  users: User[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType> //  포멧 지정
) {
  try {
    const users = await client.user.findMany();
    console.log(users);
    res.status(200).json({ name: "asdasdasd", users }); // users: users 는 users로 대체가능
  } catch (err) {}
}
```

# fetch 사용

```
 useEffect(() => {
    //컴포넌트 로딩될때 한번만 실행되는 함수
    //사용자목록을 가져와서 state변수애 저장

    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);
```

# typescript 오류를 한줄만 우회하는 방법(급할때만 사용)

```
@ts-ignore
```

# prisma_Db

```

model Device {
 id:  ~~~
sencings Sencing[] // 작성 후 저장
}

model Sencing {
 id:  ~~~
}
```

# schema.prisma

```

model Device {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  createAt DateTime @default(now())
  usdateAt DateTime @updatedAt

  product  String
  meno     String? //추가 할 때는 ?를 붙여서 추가
  sencings Sencing[]
}
```

자신있으면 복사한뒤 해당 요소에 관한 값을 넣어준 뒤 넣거나
자신없으면 데이터 삭제 후 새로 데이터 삽입
