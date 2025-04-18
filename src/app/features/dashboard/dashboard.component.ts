import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { HttpClientModule} from '@angular/common/http';
import {Hospital, HospitalExpand} from '../../models/hospital.model';
import {Product, PRODUCT_STATUSES, ProductStatus} from '../../models/product.model';
import {AgentService} from '../../services/agent.service';

import {RegionService} from '../../services/region.service';
import {IRegion, RegionExpand} from '../../models/region.model';
import {HospitalService} from '../../services/hospital.service';
import {ProductService} from '../../services/product.service';
import {FormsModule} from '@angular/forms';
import {Agent} from '../../models/agent.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, // Cho *ngIf, *ngFor
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatButtonModule,
    MatTooltipModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DragDropModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private regionService = inject(RegionService);
  private hositalService = inject(HospitalService);
  private productService = inject(ProductService);
  private agentService = inject(AgentService);
  regions: RegionExpand[] = [];
  regionsData : IRegion[] = [];
  hospitalsData: Hospital[] = [];
  agentsData: Agent[] = [];
  companyData: string[] = [];
  regionId: string = '';
  hospitalId: string = '';
  agentId: string = '';
  productStatuses: ProductStatus[] = PRODUCT_STATUSES;
  selectedStatus: ProductStatus | '' = '';

  constructor() {
  }

  toggleArea(area: any) {
    area.expanded = !area.expanded;
  }

  toggleHospital(hospital: any) {
    hospital.expanded = !hospital.expanded;
  }

  dropArea(event: CdkDragDrop<RegionExpand[]>) {
    moveItemInArray(this.regions, event.previousIndex, event.currentIndex);
  }


  ngOnInit(): void {
    this.loadRegions();
    this.getListHospital('');
    this.getListAgent();
    this.getListAllCompany();
  }

  loadRegions() {
    this.regionService.getRegions().subscribe(regions => {
      this.regions = regions;
      this.regionsData = regions;
      for (let region of this.regions) {
        this.loadHospitals(region._id, region);
      }
    })
  }

  onChangeRegion(e: any) {
    this.regionId = e.value;
    this.hospitalId = '';
    if (e.value) {
      this.hospitalsData = [];
      this.getListHospital(e.value);
    } else {
      this.hospitalsData = [];
      this.getListHospital('');
    }
    this.loadData();
  }

  onChangeHospital(e: any) {
    this.loadData();
  }

  onChangeAgent(e: any) {
    this.agentId = e.value;
    this.loadData();
  }
  onChangeStatus(e: any) {
    this.selectedStatus = e.value;
    this.loadData();
  }

  getListHospital(id: string){
    if (id) {
      this.hositalService.getHospitals(id).subscribe(hospital => {
        this.hospitalsData = hospital;
      })
    } else {
      this.hositalService.getAllHospitals().subscribe(hospital => {
        this.hospitalsData = hospital;
      })
    }
  }

  getListAgent() {
    this.agentService.getAllAgents().subscribe(agent => {
      this.agentsData = agent;
      console.log( "Agent là data ", this.agentsData);
    })
  }

  getListAllCompany() {
    this.productService.getListAllCompany().subscribe(company => {
      this.companyData = company;
    })
  }

  loadHospitals(regionId: string, region: RegionExpand) {
    this.hositalService.getHospitals(regionId).subscribe(hospitals => {
      region.hospital = hospitals;
      for (let hospital of region.hospital) {
        this.loadProducts(hospital._id, hospital);
      }
    })
  }

  loadProducts(hospitalId: string, hospital: HospitalExpand) {
    this.productService.getProductsByHospitalId(hospitalId).subscribe(products => {
      hospital.products = products;
      hospital.pageIndex = 0;
      hospital.pageSize = 5;
      hospital.pageProducts = this.getPageData(products, hospital.pageIndex, hospital.pageSize);
    })
  }

  getPageData(products: Product[], pageIndex: number, pageSize: number):Product[] {
    const startIndex = pageIndex * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }

  // Sự kiện phân trang
  onHospitalPage(event: PageEvent, hospital: HospitalExpand) {
    hospital.pageIndex = event.pageIndex;
    hospital.pageSize = event.pageSize;
    hospital.pageProducts = this.getPageData(hospital.products || [], hospital.pageIndex, hospital.pageSize);
  }

  loadData() {
    const body: any = {};
    if (this.regionId) {
      body.regionId = this.regionId;
    }
    if (this.hospitalId) {
      body.hospitalId = this.hospitalId;
    }
    if (this.agentId) {
      body.agentId = this.agentId;
    }
    if (this.selectedStatus) {
      body.status = this.selectedStatus;
    }
    if (Object.keys(body).length === 0) {
      this.loadRegions();
    } else {
      this.productService.getFilteredProducts(body).subscribe(products => {
        this.regions = this.buildRegionTree(products);
      })
    }
  }

  buildRegionTree(products: Product[]): RegionExpand[] {
    const regionMap = new Map<string, RegionExpand>();

    for (const product of products) {
      const hospital = product?.hospitalId;
      const region = hospital?.regionId;
      const regionId = region?._id;
      const regionName = region?.name;
      const hospitalId = hospital?._id;
      const hospitalName = hospital?.name;

      if (!regionId || !hospitalId) continue;

      if (!regionMap.has(regionId)) {
        regionMap.set(regionId, new RegionExpand(regionId, regionName || '', false, []));
      }
      const regionItem = regionMap.get(regionId)!;

      let hospitalItem = regionItem.hospital?.find(h => h._id === hospitalId);

      if (!hospitalItem) {
        hospitalItem = new HospitalExpand(hospitalId, hospitalName || '',0, 5, region, [], false, []);
        regionItem.hospital?.push(hospitalItem);
      }
      hospitalItem.products?.push(product);
    }
    for (const region of regionMap.values()) {
      for (const hospital of region.hospital || []) {
        hospital.pageProducts = this.getPageData(hospital.products || [], hospital.pageIndex, hospital.pageSize);
      }
    }
    return Array.from(regionMap.values());
  }



  protected readonly PRODUCT_STATUSES = PRODUCT_STATUSES;
}
