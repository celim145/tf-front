import { Router } from 'express';
import express from 'express';

import api from './api.js';
import web from './web.js';
import fileUpload from 'express-fileupload';
import CorsMiddleware from '../app/Http/Middlewares/CorsMiddleware.js';

export default (function () {

    const router = Router();

    /** Usado para servir json */
    router.use(express.json());

    router.use(express.urlencoded({ extended: true }));

    router.use(fileUpload());

    // Apis
    router.use('/api', CorsMiddleware, api);

    ////
    router.use('/', web);

    /** Se nenhuma rota for encontrada, 404 neles! */
    router.use((request, response) => {
        response.status(CONSTANTS.HTTP.NOT_FOUND).json({ error: "Not found" });
    });

    return router;

})();
