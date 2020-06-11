module.exports = (sequelize, DataTypes) =>{
    return sequelize.define("seeboard",{
        
        userNickName:{
            type: DataTypes.STRING(30),
            allowNull : false,
        },

        title:{
            type : DataTypes.STRING(50),
            allowNull : false
        },

        separate:{
            type:DataTypes.STRING(30),
            allowNull : false
        },

        content : {
            type: DataTypes.TEXT,
            allowNull : false
        },

        view: {
            type:DataTypes.INTEGER,
            defaultValue : 0
        },

        createdAt :{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue : sequelize.literal(`now()`)
        }
    },{
        freezeTableName : true,
        timestamps : false,
    })
}