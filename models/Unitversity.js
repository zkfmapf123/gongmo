module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("university",{
        univTitle : {
            type: DataTypes.STRING(20),
            allowNull : true
        },
        univArea : {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    },{
        freezeTableName : true
    })
}