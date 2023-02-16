import express from "express"
import corss from "cors"
import {postRouter} from "./router/postRouter"

const app = express()

app.use(corss())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/posts", postRouter)


