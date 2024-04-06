import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Genre {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;
}

export default Genre;
