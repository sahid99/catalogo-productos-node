const connection = require("../db");

const addCategory = (req, res) => {
    const { name } = req.body;

    if (name) {
        connection.query(`insert into categories (id, name) values (NULL, '${name}')`, function (error, results, fields) {
                if (!error) {
                    connection.query(
                        "select * from categories",
                        function (error, results, fields) {
                            if (!error) {
                                res.status(200).send(JSON.stringify(results));
                            } else {
                                res.status(500).send([]);
                            }
                        }
                    );
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } else {
        return res.status(400).json({ success: false, message: "Bad request" });
    }
};

const getCategories = (req, res) => {
    connection.query("select * from categories", function (error, results, fields) {
        if (!error) {
            res.status(200).send(JSON.stringify(results));
        } else {
            res.status(500).send([]);
        }
    });
};

const modifyCategory = async (req, res) => {
    const { db } = await connectToDatabase();
    const { categoryName, _id } = req.body;

    if (categoryName && _id) {

        connection.query(`update categories set name = ? where id = ?`[categoryName, _id], function (error, results, fields) {
                if (!error) {
                    connection.query(
                        "select * from categories",
                        function (error, results, fields) {
                            if (!error) {
                                res.status(200).send(JSON.stringify(results));
                            } else {
                                res.status(500).send([]);
                            }
                        }
                    );
                } else {
                    res.status(500).send(error);
                }
            }
        );

    }
    else 
    {
        return res.status(400).json({ success: false, message: "Bad request" });
    }

}

const deleteCategory = async (req, res) => {
    const { db } = await connectToDatabase();
    const { _id } = req.body;

    if (_id) {

        connection.query(`delete from categories where id = ?`[_id], function (error, results, fields) {
                if (!error) {
                    connection.query(
                        "select * from categories",
                        function (error, results, fields) {
                            if (!error) {
                                res.status(200).send(JSON.stringify(results));
                            } else {
                                res.status(500).send([]);
                            }
                        }
                    );
                } else {
                    res.status(500).send(error);
                }
            }
        );

    }
    else 
    {
        return res.status(400).json({ success: false, message: "Bad request" });
    }

}

module.exports = {addCategory, getCategories, modifyCategory, deleteCategory};