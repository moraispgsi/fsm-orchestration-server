module.exports = (sequelize, DataType) => {
    const Dispatchers = sequelize.define('Dispatchers', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        url: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        token: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        classMethods: {
            associate: (models) => {
                Dispatchers.belongsTo(models.Users);
            },
        },
    });
    return Dispatchers;
};
