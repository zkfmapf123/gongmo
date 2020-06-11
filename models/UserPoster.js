module.exports= (sequelize, DataTypes)=>{
    return sequelize.define("userPoster",{
        userId :{
            type:DataTypes.INTEGER,
            allowNull : true
        },
        
        posterId : {
            type:DataTypes.INTEGER,
            allowNull : true
        },

        thumbsCount:{
            type: DataTypes.BOOLEAN,
            defaultValue : true
        },

        favorite : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },{
        freezeTableName : true,
    }
)};