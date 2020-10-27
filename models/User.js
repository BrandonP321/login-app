const bcrypt = require('bcrypt')

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // encrypt password before inserting into table
    User.beforeCreate(function(user){
        user.password= bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })

    return User;
};