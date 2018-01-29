import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { KasaListesiComponent } from './kasalistesi.component';
import { DxDataGridModule, DxDateBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": KasaListesiComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, DxDataGridModule,FormsModule,DxDateBoxModule,DxTextBoxModule
    ], exports: [
        RouterModule
    ], declarations: [
        KasaListesiComponent
    ]
})
export class KasaListesiModule {


}