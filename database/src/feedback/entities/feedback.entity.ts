import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Feedback {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  userID: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'boolean' })
  isDraft: boolean;

  @Column({type:'jsonb', nullable: true})
  json:JSON | null;

  @Column({type:'varchar', nullable: true})
  path:string | null;

  @BeforeInsert()
  beforeInsert() {
    //generate ID
    this.id = uuidv4();
    //set default values
    this.isDraft = true;
    this.json = null;
    this.path = null;
  }

}
