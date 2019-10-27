import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
class Coffee extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public price: number;
 
    @CreateDateColumn()
    public created_at: Date;

    @Column({ default: '' })
    public image: string;
}

export { Coffee };
