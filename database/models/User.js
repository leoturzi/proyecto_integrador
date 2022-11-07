// module.exports = (sequelize, dataTypes) => {
//     const alias = 'Users';
//     const cols = {
//         id: {
//             type: dataTypes.INTEGER.UNSIGNED,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         first_name: {
//             type: dataTypes.STRING,
//         },
//         last_name: {
//             type: dataTypes.STRING,
//         },
//         email: {
//             type: dataTypes.STRING,
//         },
//         password: {
//             type: dataTypes.STRING,
//         },
//         shippingAddress: {
//             type: dataTypes.STRING,
//         },
//         phone: {
//             type: dataTypes.STRING,
//         },
//         type_id: {
//             type: dataTypes.INTEGER.UNSIGNED,
//         },
//         avatar: {
//             type: dataTypes.STRING,
//         },
//     };
//     const config = {
//         tableName: 'users',
//         timestamps: false,
//     };
//     const User = sequelize.define(alias, cols, config);
//     User.associate = (models) => {
//         User.belongsTo(models.Types, {
//             as: 'types',
//             foreignKey: 'type_id',
//         });
//     };
//     return User;
// };

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define(
        'User',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            provincia: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            calle: {
                type: DataTypes.STRING(45),
                allowNull: true,
            },
            detail: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: 'undefined',
            },
            type_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 2,
                references: {
                    model: 'types',
                    key: 'id',
                },
            },
            avatar: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: 'default.png',
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'users_ype_id_foreign',
                    using: 'BTREE',
                    fields: [{ name: 'type_id' }],
                },
            ],
        }
    );
    User.associate = (models) => {
        User.belongsTo(models.Types, {
            as: 'types',
            foreignKey: 'type_id',
        });
    };
    return User;
};
