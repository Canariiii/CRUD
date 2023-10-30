import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  name: string = '';
  email: string = '';
  users: any[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll().subscribe((data: any) => {
      this.users = data;
      this.users.forEach(user => {
        user.updatedName = user.nombre;
        user.updatedEmail = user.email;
      });
    });
  }

  addUser() {
    if (!this.name || !this.email) {
      console.error('Name and email are required');
      return;
    }
    const user = {
      nombre: this.name,
      email: this.email
    };
    this.userService.addUser(user).subscribe((data: any) => {
      console.log(data);
      this.getAllUsers();
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      console.log(data);
      this.getAllUsers();
    });
  }

  updateUser(user: any, id: number) {
    const updatedUser = {
      nombre: user.updatedName,
      email: user.updatedEmail
    };
    this.userService.updateUser(updatedUser, id).subscribe((data: any) => {
      console.log(data);
      this.getAllUsers();
    });
  }
}
