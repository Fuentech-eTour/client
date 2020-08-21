import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-saved-lists',
  templateUrl: './saved-lists.component.html',
  styleUrls: ['./saved-lists.component.scss']
})
export class SavedListsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['Nombre', 'Cantidad', 'Total'];

  constructor() { }

  ngOnInit(): void {
  }

}
