module.exports= (sequelize, DataTypes)=>{
    return sequelize.define("user",{
        univId :{
            type:DataTypes.INTEGER,
            allowNull : true
        },
        
        email : {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },

        password:{
            type:DataTypes.STRING(100),
            allowNull: false,
        },

        nickName : {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        
        comment: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        grade : {
            type : DataTypes.INTEGER,
            allowNull: true
        },

        averageScore : {
            type: DataTypes.FLOAT(3),
            allowNull: true
        },

        livesCity : {
            type: DataTypes.STRING(10),
            allowNull: true
        },

        target : {
            type: DataTypes.STRING(10),
            allowNull: true
        },

        warning :{
            type:DataTypes.INTEGER,
            allowNull : true,
            defaultValue : 0
        },

        loginMethod :{
            type:DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "local",
        },

        kakakoId : {
            type:DataTypes.STRING(30),
            allowNull: true,
            defaultValue : "",
        },

        googleId : {
            type:DataTypes.STRING(30),
            allowNull:true,
            defaultValue: "",
        },
        
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('now()')
        }
    },{
        freezeTableName : true,
    });
}