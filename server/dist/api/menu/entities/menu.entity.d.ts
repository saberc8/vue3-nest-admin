import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class MenuEntity extends SharedEntity {
    constructor();
    name: string;
    title: string;
    path: string;
    component: string;
    icon: string;
    redirect: string;
    hideMenu: boolean;
    hideBreadcrumb: boolean;
    pid: number;
    orderNo: number;
    frameSrc: string;
    keepAlive: boolean;
}
