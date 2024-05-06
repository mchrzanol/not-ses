import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  role: string;

  @Column({ type: 'varchar' })
  email: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
