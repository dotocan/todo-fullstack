import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from "typeorm";

@Entity()
export class TodoItem {
    @PrimaryGeneratedColumn()
    id: string | number;

    @Column()
    title: string;

    @Column()
    description?: string;

    @Column()
    completed: boolean;

    @CreateDateColumn({ name: "created", type: "timestamptz" })
    created: Date;
}
