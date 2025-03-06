import { defineConfig } from "drizzle-kit";
import {databaseUrl} from "./database";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  out :"./database/migrations",
  schema: './database/schema.ts',
  dbCredentials :{
    url : databaseUrl || ''
  }
})
