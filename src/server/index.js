import { Promise } from 'bluebird'
import http from 'http'
import { connectDb, migrate } from 'Db'

const PORT = process.env.PORT || 8080

const httpServer = http.createServer(async (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end()
  }

  // If no route present
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

connectDb()

const promises = [migrate()]

Promise.all(promises).then(() => {
  httpServer.listen(PORT, () => {
    console.info(`Server listening on port ${PORT}`)
  })
})
