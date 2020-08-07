const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Todo);
  };

  return User;
};

export default user;
