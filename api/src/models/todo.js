const todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define("todo", {
    task: {
      type: DataTypes.STRING,
      unique: false,
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

  Todo.associate = (models) => {
    Todo.belongsTo(models.User);
  };

  return Todo;
};

export default todo;
