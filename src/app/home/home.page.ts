import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  gotoUsers(){
    this.router.navigateByUrl("/users");
  }

  gotoPosts(){
    this.router.navigateByUrl("/posts");
  }

  gotoComentarios(){
    this.router.navigateByUrl("/comentarios");
  }

}
