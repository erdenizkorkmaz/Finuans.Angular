import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from '../../../../shared/main.service';

@Component({
  selector: 'app-musteriler',
  templateUrl: './musteriler.component.html',
  styleUrls: [],
  providers: [MainService]
})
export class MusterilerComponent implements OnInit {
  @ViewChild("detailGrid") detailGrid;
  dataSource = [];
  dataSource2 = [];
  datasource3 = [];
  dataFields = [
    { dataField: 'ID', caption: 'ID', alignment: 'left' },
    { dataField: "Unvan", caption: "Unvan" },
    { dataField: "Bakiye", caption: "Bakiye", format: '#0.00', alignment: 'right' },
    { dataField: "Odenecek", caption: "Ödenecek", format: '#0.00', alignment: 'right' },
    { dataField: "TahsilEdilecek", caption: "Tahsil Edilecek", format: '#0.00', alignment: 'right' }
  ];
  actions = [
    { actionEvent: "new", actionName: "Yeni Müşteri" }
  ]
  info = false;
  cities;
  districts;
  categories;
  selectedItem;
  supplierTypes = [
    { ID: 0, Name: "Tüzel Kişi" },
    { ID: 1, Name: "Gerçek Kişi" },
  ]
  state = 0;

  getList() {
    this.main.reqGet("CariHesap/List").subscribe(res => {
      this.dataSource = res;
      this.state = 0;
    });
  }

  handleGridAction(e) {
    this.main.reqGet("CariHesap/GetbyId/" + e.data.ID).subscribe(res => {
      this.selectedItem = res;
      this.selectboxHandler();
      this.getKasaba();
      this.main.reqGet("CariYetkili/Get/" + res.SehirID).subscribe(resYetkili => {
        this.dataSource2 = resYetkili;
      })
      this.state = 1;
      this.info = true;
    });
    this.main.reqGet("CariHesap/IslemGecmisi/" + e.data.ID).subscribe(resIslem => {
      this.datasource3 = resIslem;
    });
  }

  handleNewAction(e) {
    this.info = false;
    this.selectedItem = undefined;
    this.state = 2;
  }

  cancelForm() {
    this.state = 0;
    this.selectedItem = undefined;
  }

  saveForm(form) {
    if (!form.instance.validate()["isValid"]) {
      this.main.notifier("Lütfen zorunlu alanları doldurun.", false);
      return false;
    }
    let reqData = {
      CariHesap: form.formData,
      Yetkili: this.dataSource2
    }
    this.main.reqPost("CariHesap/SaveCustomer", reqData).subscribe(res => {
      this.getList();
      this.selectedItem = undefined;
      this.state = 0;
    });
  }

  addRow() {
    if (this.dataSource2.length > 4) {
      this.main.notifier("En fazla 5 yetkili ekleyebilirsiniz.", false);
    } else {
      this.dataSource2.push({ Adi: "", Eposta: "", Telefon: "", Notlar: "" });
    }
  }

  syncDataSource(e) {
    let updatedDatas = this.detailGrid.instance.getVisibleRows();
    let tempData = [];
    updatedDatas.forEach(item => {
      item.data.CariID = this.selectedItem.ID;
      tempData.push(item.data);
    });
    this.dataSource2 = tempData;
  }

  getKasaba() {
    this.main.reqGet("Sehir/GetKasaba?SehirID=" + this.selectedItem.SehirID).subscribe(resKasaba => {
      this.districts = resKasaba;
    });
  }

  selectboxHandler() {
    this.main.reqGet("Sehir/Get").subscribe(resSehir => {
      this.cities = resSehir;
    });
    this.main.reqGet("Kategori/Get").subscribe(resKategori => {
      this.categories = resKategori;
    });
  }

  constructor(private main: MainService) {
    this.getKasaba =this.getKasaba.bind(this);
   }

  ngOnInit(): void {
    this.getList();
  }
}
