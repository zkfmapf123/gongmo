module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("seeboardComments",{

        seeboardId : {
            type : DataTypes.INTEGER,
            allowNull : false
        },

        userEmail:{
            type: DataTypes.STRING(30),
            allowNull : false
        },
        
        content :{
            type:DataTypes.TEXT,
            allowNull : false
        },
        
        createdAt :{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue : sequelize.literal(`now()`)
        }
    },{
        freezeTableName : true,
        timestamps : false,
    });
};
