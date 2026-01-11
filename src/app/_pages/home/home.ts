import { Component } from '@angular/core';
import {Posts} from '../../_components/posts/posts';

@Component({
  selector: 'app-home',
  imports: [Posts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
