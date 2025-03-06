## Env
+ Next 15.2
+ React 19

## Getting Started

먼저, 프로젝트에서 사용할 데이터베이스(testdb)를 생성하고, 사용자(test)를 추가합니다.

```sql
CREATE DATABASE testdb;
CREATE USER test WITH PASSWORD 'test';
GRANT ALL PRIVILEGES ON DATABASE testdb TO test;
ALTER DATABASE testdb OWNER TO test;
```

DATABASE_URL을 .env 파일에 추가하여 데이터베이스 연결 정보를 설정합니다.

+ env

```
DATABASE_URL=postgresql://test:test@localhost:5432/testdb
```

+ database/index.ts : drizzle-orm 설정
+ database/schema.ts : drizzle-orm으로 데이터베이스 스키마 정의
+ database/init-data.ts : 초기 데이터
+ __tests__ : jest 테스트 코드 

```
npm run generate   # 마이그레이션 SQL 파일 생성
npm run migrate    # 데이터베이스에 적용
npm run sedd       # 데이터 베이스에 초기 데이터 Insert
```

## Start

```bash
npm run dev
```

## Test

```bash
npm run test
```
