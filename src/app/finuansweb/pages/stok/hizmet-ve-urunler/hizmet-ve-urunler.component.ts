import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../shared/main.service';

@Component({
  selector: 'app-hizmet-ve-urunler',
  templateUrl: './hizmet-ve-urunler.component.html',
  styleUrls: ['./hizmet-ve-urunler.component.css'],
  providers: [ MainService ]
})
export class HizmetVeUrunlerComponent implements OnInit {

  dataSource = [];
  dataSource2 = [];
  dataFields = [
    {dataField: "ID", caption: "ID"},
    {dataField: "Adi", caption: "Adı"},
    {dataField: "Miktar", caption: "Miktar"},
    {dataField: "AlisFiyati", caption: "Alış Fiyatı"},
    {dataField: "SatisFiyati", caption: "Satış Fiyatı"},
  ];
  info;
  categories;
  currencies;
  selectedItem;
  state = 0;

  getList() {
    this.main.reqGet("StokHizmet/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
  }

  handleItem(e) {
    this.main.reqGet("StokHizmet/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.main.reqGet("Kategori/Get").subscribe(resKategori => {
        this.categories = resKategori;
      });
      this.main.reqGet("Doviz/Get").subscribe(resDoviz => {
        this.currencies = resDoviz;
      });
      this.main.reqGet("StokHizmet/IslemGecmisi/" + e.data.ID).subscribe(resIslem => {
        this.info = resIslem;
      });
      this.state = 2;
    });
  }

  newItem() {
    this.state = 1;
    this.selectedItem = new Object();
  }

  cancelOperation() {
    this.state = 0;
    this.selectedItem = new Object();
  }

  saveItem() {
    let url;
    if (this.state === 1) {
      url = "StokHizmet/Insert";
    } else {
      url = "StokHizmet/Update";
    }
    this.main.reqPost(url, this.selectedItem).subscribe(res => {
      this.getList();
    });
  }

  addRow() {
    this.dataSource2.push({
      Barkod: "",
      Birim: "",
      Miktar: 1,
      Fiyat: 1
    });
  }

  constructor(private main: MainService) { }

  ngOnInit(): void {
    this.getList();
  }
}