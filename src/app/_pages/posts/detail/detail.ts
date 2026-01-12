import {Component, input} from '@angular/core';

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  public id = input<string | undefined>();
  public title = input<string | undefined>();


}
