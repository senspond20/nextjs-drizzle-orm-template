import {config} from 'dotenv'
import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres';

config({path : '.env', override: true})
export const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL 환경 변수가 설정되지 않았습니다.');
}
const client = postgres(databaseUrl, {
  max: 4, // 최대 커넥션 수
  idle_timeout: 10, // 초 단위, 유휴 연결 유지 시간
  connect_timeout: 30, // 초 단위, 연결 시도 타임아웃
});

export const db = drizzle({client})