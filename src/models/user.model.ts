import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users', // Ensure it matches your database table name
  timestamps: true,
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  googleId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
}
