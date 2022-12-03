import { Component, Input, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Interest } from 'src/app/models/interests-model';

@Component({
  selector: 'app-interest-card',
  templateUrl: './interest-card.component.html',
  styleUrls: ['./interest-card.component.scss'],
})
export class InterestCardComponent implements OnInit {

  @Input() interest?: Interest;
  constructor() { }

  ngOnInit() { }

  toggleInterest() {


    
  }
}
