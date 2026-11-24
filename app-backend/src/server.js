import http from "http"
import { app } from "./app.js"
import { env } from "./config/env.js"

// eslint-disable-next-line no-undef
const port = env.APP_PORT || 3001

app.set("port", port)

const server = http.createServer(app)
server.listen(port)
