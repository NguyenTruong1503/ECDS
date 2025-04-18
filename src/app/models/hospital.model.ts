import {IRegion} from './region.model';
import {Product} from './product.model';

export interface Hospital {
  _id?: string;
  name?: string;
  regionId?: IRegion;
  products?: Product[];
}
export interface IHospitalExpand extends Hospital {
  expanded?: boolean;
  pageProducts?: Product[]; // dữ liệu hiển thị trên giao diện
  pageIndex? : number;
  pageSize? : number;
}
export class HospitalExpand implements IHospitalExpand {
  constructor(
    public _id: string,
    public name: string,
    public pageIndex: number,
    public pageSize: number,
    public regionId?: IRegion,
    public products?: Product[],
    public expanded?: boolean,
    public pageProducts?: Product[], // dữ liệu hiển thị trên giao diện

  ) {
    this._id = _id ;
    this.name = name;
    this.regionId = regionId ? regionId : undefined;
    this.products = products ? products : [];
    this.expanded = expanded ? expanded : false;
    this.pageProducts = pageProducts ? pageProducts : [];
    this.pageIndex = pageIndex ;
    this.pageSize = pageSize ;
  }
}
