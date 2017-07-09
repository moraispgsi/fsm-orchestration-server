module.exports = app => {
    const Servers = app.db.models.Servers;
    app.route('/servers')
        .all(app.auth.authenticate())
        /**
         * @api {get} /servers List the user's servers
         * @apiGroup Servers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiSuccess {Object[]} servers Server's list
         * @apiSuccess {Number} servers.id Server id
         * @apiSuccess {String} servers.name Server name
         * @apiSuccess {String} servers.url Server URL
         * @apiSuccess {String} servers.token Server TOKEN
         * @apiSuccess {Date} servers.updated_at Update's date
         * @apiSuccess {Date} servers.created_at Register's date
         * @apiSuccess {Number} servers.user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    [{
         *      "id": 1,
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/server1",
         *      "token": "xyz.abc.123.hgf"
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }]
         * @apiErrorExample {json} List error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Servers.findAll({
                where: { user_id: req.user.id },
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        /**
         * @api {post} /servers Register a new server
         * @apiGroup Servers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {String} name Server name
         * @apiParam {String} url Server URL
         * @apiParam {String} token Server TOKEN
         * @apiParamExample {json} Input
         *    {"name": "INSTICC One", "url": "http://www.insticc.org/server1", "token": "xyz.abc.123.hgf"}
         * @apiSuccess {Number} id Server id
         * @apiSuccess {String} name Server name
         * @apiSuccess {String} url Server URL
         * @apiSuccess {String} token Server TOKEN
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/server1",
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
            Servers.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });


    app.route('/servers:id')
        .all(app.auth.authenticate())
        /**
         * @api {get} /servers/:id Get a server
         * @apiGroup Servers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Server id
         * @apiSuccess {Number} id Server id
         * @apiSuccess {String} name Server name
         * @apiSuccess {String} url Server URL
         * @apiSuccess {String} token Server TOKEN
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/server1",
         *      "token": "xyz.abc.123.hgf"
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Server not found error
         *    HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Find error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Servers.findOne({ where: {
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
         * @api {put} /servers/:id Update a server
         * @apiGroup Servers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Server id
         * @apiParam {String} name Server name
         * @apiParam {String} url Server URL
         * @apiParam {String} token Server TOKEN
         * @apiParamExample {json} Input
         *    {
         *      "name": "INSTICC One",
         *      "url": "http://www.insticc.org/server1",
         *      "token": "xyz.abc.123.hgf"
         *    }
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Update error
         *    HTTP/1.1 412 Precondition Failed
         */
        .put((req, res) => {
            Servers.update(req.body, { where: {
                id: req.params.id,
                user_id: req.user.id,
            } })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        /**
         * @api {delete} /servers/:id Remove a server
         * @apiGroup Servers
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         *    {"Authorization": "JWT xyz.abc.123.hgf"}
         * @apiParam {id} id Server id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Delete error
         *    HTTP/1.1 412 Precondition Failed
         */
        .delete((req, res) => {
            Servers.destroy({ where: {
                id: req.params.id,
                user_id: req.user.id,
            } })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

};