module.exports = (sequelize, dataTypes) => {
    const alias = 'Users'
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        first_name : {
            type : dataTypes.STRING
        },
        last_name : {
            type : dataTypes.STRING
        },
        email : {
            type : dataTypes.STRING
        },
        password : {
            type : dataTypes.STRING
        },
        shippingAddress : {
            type : dataTypes.STRING
        },
        country : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        phone : {
            type : dataTypes.STRING
        },
        type_id : {
            type : dataTypes.INTEGER.UNSIGNED
        },
        avatar : {
            type : dataTypes.STRING
        }
    };
    const config = {
        tableName : 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);
    User.associate = (models) => {
        User.belongsTo(models.Types, {
            as : 'types',
            foreignKey : 'type_id'
        });
    };
    return User;
};