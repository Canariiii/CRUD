import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: any[] = [];
  titulo: string = '';
  contenido: string = '';
  id_usuario: string = '';
  post: any;

  constructor(private postService: PostServiceService) {}

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAll().subscribe(
      (data: any) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts: ', error);
      }
    );
  }

  addPost() {
    if (this.titulo && this.contenido && this.id_usuario && !isNaN(parseInt(this.id_usuario))) {
      const newPost = {
        titulo: this.titulo,
        contenido: this.contenido,
        usuario: { id: parseInt(this.id_usuario) }
      };
      
      this.postService.addPost(newPost).subscribe(
        (data: any) => {
          console.log('Post added successfully: ', data);
          this.getAllPosts();
          this.clearFields();
        },
        (error) => {
          console.error('Error adding post: ', error);
        }
      );
    } else {
      console.error('Please fill all the fields and provide a valid user ID');
    }
  }
  

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      (data: any) => {
        console.log('Post deleted successfully: ', data);
        this.getAllPosts();
      },
      (error) => {
        console.error('Error deleting post: ', error);
      }
    );
  }

  clearFields() {
    this.titulo = '';
    this.contenido = '';
    this.id_usuario = '';
  }

  updatePost(post: any) {
    const updatedPost = {
      titulo: post.updatedTitle,
      contenido: post.updatedContent,
      usuario: { id: parseInt(post.updatedUserID) }
    };
  
    this.postService.updatePost(post.id, updatedPost).subscribe(
      (data: any) => {
        console.log('Post updated successfully: ', data);
        this.getAllPosts();
      },
      (error: any) => {
        console.error('Error updating post: ', error);
      }
    );
  }  
}
