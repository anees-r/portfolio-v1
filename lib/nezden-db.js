// Read-only connection to Nezden's database (content is edited in Nezden's CMS).
// Server-only: never import this from a client component.
import 'server-only';
import pg from 'pg';

const g = globalThis;

function createPool() {
  if (!process.env.NEZDEN_DATABASE_URL) {
    throw new Error('NEZDEN_DATABASE_URL is not set');
  }
  const pool = new pg.Pool({
    connectionString: process.env.NEZDEN_DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 5000,
  });
  // An idle client erroring (e.g. DB restart) must not crash the process.
  pool.on('error', (err) => console.error('[nezden-db] idle client error:', err.message));
  return pool;
}

function getPool() {
  if (!g.__nezdenPool) g.__nezdenPool = createPool();
  return g.__nezdenPool;
}

export const q = async (sql, params = []) => (await getPool().query(sql, params)).rows;
