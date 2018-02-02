import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'calisan-kart',
    templateUrl: './calisan.component.html',
    styles: [":host{width:100%}"],
})
export class CalisanComponent implements OnInit {
    AcilisTarihi:any;
    SelectedDoviz:string;
    HesapAdi:string;
    AcilisBakiyesi:number;

    DovizList: string[] = [
        "TRL",
        "USD",
        "EURO",
    ];

    constructor() { 
        //this.AcilisTarihi
    }
    

    Kaydet()
    {
        console.log(this.AcilisTarihi);
        console.log(this.SelectedDoviz);
        console.log(this.HesapAdi);
        console.log(this.AcilisBakiyesi);
    }

    Sil()
    {

    }

    ngOnInit() {
        this.AcilisTarihi = new Date();
     }
}