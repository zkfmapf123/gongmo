module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("poster",{
        title:{
            type: DataTypes.STRING(60),
            allowNull: true,
        },
        divide:{
            type: DataTypes.INTEGER,
            allowNull : false
        },
        separate:{
            type: DataTypes.STRING(100),
            allowNull: true
        },
        target:{
            type: DataTypes.STRING(50),
            allowNull: true
        },
        agency:{
            type:DataTypes.STRING(50),
            allowNull: true
        },
        period:{
            type: DataTypes.STRING(30),
            allowNull: true
        },
        amount:{
            type:DataTypes.STRING(50),
            allowNull: true
        },
        link:{
            type:DataTypes.STRING(200),
            allowNull: true
        },
        text:{
            type:DataTypes.TEXT,
            allowNull: true
        },
        imageUrl:{
            type:DataTypes.STRING(50),
            allowNull: true
        },
        view:{
            type:DataTypes.INTEGER,
            defaultValue : 0
        },
        goodPoint:{
            type:DataTypes.INTEGER,
            defaultValue : 0
        },
        badPoint:{
            type:DataTypes.INTEGER,
            defaultValue : 0
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('now()')
        }
    },{
        freezeTableName : true,
    })
}