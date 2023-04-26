import express from 'express'
const chalk = require("chalk");
import cors from 'cors'
import { useRouter } from './router/courseRouter'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(chalk.bgGreen.black(`Servidor rodando na porta ${3003}`))
})

app.use('/courses',useRouter)

