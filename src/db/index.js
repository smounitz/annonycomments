const { readdir, readFile } = require('fs').promises
import { Promise } from 'bluebird'
import { Pool } from 'pg'
import { findMigrations, recordMigrationFiles } from 'Db/migration'

let _pool = false

export const connectDb = () => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI,
    })
    return pool
  } catch (e) {
    throw e
  }
}

export const getDb = () => {
  if (!_pool) {
    _pool = connectDb()
  }
  return _pool.connect()
}

export const migrate = async () => {
  const runMigrations = await findMigrations()
  const migrationFiles = await readdir('./migrations').then((files) => {
    return files
      .sort()
      .filter((f) => f.match(/\d*\-[a-z]*/))
      .filter((f) => !runMigrations.includes(f))
  })
  const migrations = await Promise.map(migrationFiles, async (fn) => {
    return {
      filename: fn,
      migration: await readFile(`./migrations/${fn}`, { encoding: 'utf8' }),
    }
  })

  Promise.map(migrations,  (m) => {
    return getDb()
      .then((client) => {
        return client.query(m.migration)
      })
  })

  Promise.map(migrations, (m) => {
      return recordMigrationFiles(m.filename)
  })

}
