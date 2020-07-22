const todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    task: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Todo;
};

export default todo;
