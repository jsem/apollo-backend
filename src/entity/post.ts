import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'post' })
export default class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', nullable: false, unique: true })
  identifier: string

  @Column({ type: 'text', nullable: false })
  title: string

  @Column({ type: 'text', nullable: false })
  summary: string

  @Column({ type: 'text', nullable: false })
  body: string

  @Column({ name: 'created_on', type: 'timestamp with time zone', nullable: false })
  createdOn: string

  @Column({ name: 'updated_on', type: 'timestamp with time zone', nullable: true })
  updatedOn?: string

  @Column({ type: 'boolean', nullable: false, default: 'true' })
  visible: boolean
}