import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

class Excursion extends Model<
  InferAttributes<Excursion>,
  InferCreationAttributes<Excursion>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare city: string;
  declare date: string;
  declare theme: string;
  declare description: string;
  declare imageUrl: string;
}

export const createExcursions = (sequelize: Sequelize) => {
  return Excursion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
    },
  );
};
