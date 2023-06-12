import { Table, Model, PrimaryKey, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';


@Table({
  tableName: 'products',
  timestamps: false,
  modelName: 'products',
})
export class ProductItemModel extends Model {
  @PrimaryKey
  @Column({ field: 'id'})
  id: string;

  @Column({ field: 'title', type: DataTypes.STRING })
  title: string;

  @Column({ field: 'description', type: DataTypes.STRING })
  description: string;

  @Column({ field: 'price', type: DataTypes.INTEGER })
  price: number;

  @Column({ field: 'count', type: DataTypes.INTEGER })
  count: number;
}
