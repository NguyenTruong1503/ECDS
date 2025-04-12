import { Component } from '@angular/core';
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
import {FlexModule} from '@angular/flex-layout';


export interface Product {
  stt: number;
  code: string;
  name: string;
  industry: string;
  status: string;
  agent: string;
  company: string;
}

export interface Hospital {
  name: string;
  products: Product[];
  expanded?: boolean;
  pageIndex?: number;
  pageSize?: number;
}

export interface Area {
  name: string;
  hospitals: Hospital[];
  expanded?: boolean;
}


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

  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
  data: Area[] = [
    {
      name: 'Hồ Chí Minh',
      expanded: true,
      hospitals: [
        {
          name: 'BV Quận 1',
          expanded: true,
          pageIndex: 0,
          pageSize: 5,
          products: [
            { stt: 1, code: 'SP001', name: 'KALI CLORID KABI 10%', industry: 'Tân dược', status: 'Đang triển khai', agent: 'Phạm Tuấn Anh', company: 'CT-CPDPV-BPM' },
            { stt: 2, code: 'SP002', name: 'PARTAMOL 500 CAP', industry: 'Tân dược', status: 'Đang triển khai', agent: 'Phạm Ngọc Anh', company: 'CT-CPDPV-BPM' },
            { stt: 3, code: 'SP003', name: 'AUROLIZA 30', industry: 'Tân dược', status: 'Không được triển khai', agent: '', company: '' },
            { stt: 4, code: 'SP004', name: 'OLESOM', industry: 'Tân dược', status: 'Không được triển khai', agent: '', company: '' },
            { stt: 5, code: 'SP005', name: 'POVIDONE', industry: 'Tân dược', status: 'Chưa triển khai', agent: '', company: '' }
          ]
        },
        {
          name: 'BV Quận 2',
          expanded: false,
          pageIndex: 0,
          pageSize: 5,
          products: [
            { stt: 1, code: 'SP006', name: 'KALI CLORID KABI 10%', industry: 'Tân dược', status: 'Đang triển khai', agent: 'Phạm Tuấn Anh', company: 'CT-CPDPV-BPM' }
          ]
        }
      ]
    },
    {
      name: 'Bình Dương',
      expanded: false,
      hospitals: [
        {
          name: 'BV Đa Khoa Bình Dương',
          expanded: false,
          pageIndex: 0,
          pageSize: 5,
          products: []
        },
        {
          name: 'BV Quốc Tế Becamex',
          expanded: false,
          pageIndex: 0,
          pageSize: 5,
          products: []
        }
      ]
    }
  ];

  displayedColumns: string[] = ['stt', 'code', 'name', 'industry', 'status', 'agent', 'company'];

  toggleArea(area: any) {
    area.expanded = !area.expanded;
  }

  toggleHospital(hospital: any) {
    hospital.expanded = !hospital.expanded;
  }

  dropArea(event: CdkDragDrop<Area[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  onHospitalPage(event: PageEvent, hospital: Hospital) {
    hospital.pageIndex = event.pageIndex;
    hospital.pageSize = event.pageSize;
  }

  getPagedProducts(hospital: Hospital):Product[] {
    const startIndex = (hospital.pageIndex ?? 0) * (hospital.pageSize ?? 5);
    return hospital.products.slice(startIndex, startIndex + (hospital.pageSize ?? 5));
  }
}
