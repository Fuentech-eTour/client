import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  hide = true;
  hide2 = true;
  hide3 = true;

  constructor() { }

  ngOnInit(): void {
  }

}
