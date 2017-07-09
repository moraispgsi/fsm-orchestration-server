module.exports = app => {
    const Dispatchers = app.db.models.Dispatchers;
    app.route('/dispatchers')
        .all(app.auth.authenticate())
        /**
         * @api {get} /dispatchers List the user's dispatchers
         * @apiGroup Dispatchers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccess {Object[]} dispatchers Dispatcher's list
         * @apiSuccess {Number} dispatchers.id Dispatcher id
         * @apiSuccess {String} dispatchers.name Dispatcher name
         * @apiSuccess {String} dispatchers.url Dispatcher URL
         * @apiSuccess {String} dispatchers.token Dispatcher TOKEN
         * @apiSuccess {Date} dispatchers.updated_at Update's date
         * @apiSuccess {Date} dispatchers.created_at Register's date
         * @apiSuccess {Number} dispatchers.user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    [{
         *      "id": 1,
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/dispatcher1",
         *      "token": "xyz.abc.123.hgf"
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }]
         * @apiErrorExample {json} List error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Dispatchers.findAll({
                where: { user_id: req.user.id },
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        /**
         * @api {post} /dispatchers Register a new dispatcher
         * @apiGroup Dispatchers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {String} name Dispatcher name
         * @apiParam {String} url Dispatcher URL
         * @apiParam {String} token Dispatcher TOKEN
         * @apiParamExample {json} Input
         *    {"name": "INSTICC One", "url": "http://www.insticc.org/dispatcher1", "token": "xyz.abc.123.hgf"}
         * @apiSuccess {Number} id Dispatcher id
         * @apiSuccess {String} name Dispatcher name
         * @apiSuccess {String} url Dispatcher URL
         * @apiSuccess {String} token Dispatcher TOKEN
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/dispatcher1",
         *      "token": "xyz.abc.123.hgf"
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Register error
         *    HTTP/1.1 412 Precondition Failed
         */
        .post((req, res) => {
            req.body.user_id = req.user.id;
            Dispatchers.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });


    app.route('/dispatchers:id')
        .all(app.auth.authenticate())
        /**
         * @api {get} /dispatchers/:id Get a dispatcher
         * @apiGroup Dispatchers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Dispatcher id
         * @apiSuccess {Number} id Dispatcher id
         * @apiSuccess {String} name Dispatcher name
         * @apiSuccess {String} url Dispatcher URL
         * @apiSuccess {String} token Dispatcher TOKEN
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/dispatcher1",
         *      "token": "xyz.abc.123.hgf"
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Dispatcher not found error
         *    HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Find error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Dispatchers.findOne({ where: {
                id: req.params.id,
                user_id: req.user.id,
            } })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        /**
         * @api {put} /dispatchers/:id Update a dispatcher
         * @apiGroup Dispatchers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Dispatcher id
         * @apiParam {String} name Dispatcher name
         * @apiParam {String} url Dispatcher URL
         * @apiParam {String} token Dispatcher TOKEN
         * @apiParamExample {json} Input
         *    {
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/dispatcher1",
         *      "token": "xyz.abc.123.hgf"
         *    }
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Update error
         *    HTTP/1.1 412 Precondition Failed
         */
        .put((req, res) => {
            Dispatchers.update(req.body, { where: {
                id: req.params.id,
                user_id: req.user.id,
            } })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        /**
         * @api {delete} /dispatchers/:id Remove a dispatcher
         * @apiGroup Dispatchers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Dispatcher id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Delete error
         *    HTTP/1.1 412 Precondition Failed
         */
        .delete((req, res) => {
            Dispatchers.destroy({ where: {
                id: req.params.id,
                user_id: req.user.id,
            } })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

};