import { getDb } from 'Db'

export const findMigrations = async () => {
  const res = await getDb().then((client) => {
    return client.query(`SELECT file_name FROM migrations ORDER BY file_name;`)
  })

  return res.rows.reduce((all, cur) => {
    all.push(cur.file_name)
    return all
  }, [])
}

export const recordMigrationFiles = async (filename) => {
  const res = await getDb().then((client) => {
    return client.query(
      `INSERT INTO migrations (file_name) VALUES ('${filename}')`
    )
  })
}
