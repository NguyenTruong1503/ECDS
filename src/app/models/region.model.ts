import {HospitalExpand} from './hospital.model';

export interface IRegion {
  _id?: string;
  name?: string;
  hospital?: HospitalExpand[];
}

export interface IRegionExpand extends IRegion {
  expanded?: boolean;
}

export class RegionExpand implements IRegionExpand {
  constructor(
    public _id: string,
    public name: string,
    public expanded?: boolean,
    public hospital?: HospitalExpand[],
  ) {
    this._id = _id ;
    this.name = name;
    this.expanded = expanded ? expanded : false;
    this.hospital = hospital ? hospital : [];
  }
}

