import {Agent} from './agent.model';
import {Hospital} from './hospital.model';

export type ProductStatus = 'Đang triển khai' | 'Chưa triển khai' | 'Không được triển khai';

export const PRODUCT_STATUSES: ProductStatus[] = [
  'Đang triển khai',
  'Chưa triển khai',
  'Không được triển khai'
];

export interface IProduct {
  _id: string;
  stt: number;
  code: string;
  name: string;
  industry?: string;
  status: ProductStatus;
  agentId?: Agent
  company?: string;
  hospitalId?: Hospital
}


export class Product implements IProduct {
  constructor(
    public _id: string,
    public stt: number,
    public code: string,
    public name: string,
    public status: ProductStatus,
    public industry?: string,
    public agentId?: Agent,
    public company?: string,
    public hospitalId?: Hospital,
  ) {
    this._id = _id;
    this.stt = stt;
    this.code = code;
    this.name = name;
    this.industry = industry ? industry : undefined;
    this.status = status;
    this.agentId = agentId ? agentId : undefined;
    this.company = company ? company : undefined;
    this.hospitalId = hospitalId ;
  }
}


