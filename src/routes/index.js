import express from "express";
import form from './formRoute.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: 'Formulario' })
    })

    app.use(
        express.json(),
        form
    )
}

export default routes