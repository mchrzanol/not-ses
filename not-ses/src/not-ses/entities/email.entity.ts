import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('emails')
export class Email {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 40 })
  host: string;

  @Column({ type: 'smallint' })
  port: number;

  @Column({ type: 'varchar' })
  pass: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
