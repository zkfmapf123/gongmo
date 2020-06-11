module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("comment",{  
      userPosterId : {
        type:DataTypes.INTEGER,
        allowNull : true
    },  
      comment:{
          type: DataTypes.TEXT,
          allowNull: false
      }
    },{
      freezeTableName : true,
    })
};