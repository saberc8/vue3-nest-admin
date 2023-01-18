import { BaseEntity } from 'typeorm';
export declare class SharedEntity extends BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
