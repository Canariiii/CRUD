import { Component, OnInit } from '@angular/core';
import { ComentariosServiceService } from '../services/comentarios-service.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  comentarios: any[] = [];
  comentarioText: string = '';
  id_usuario: string = '';
  id_post: string = '';
  comentario: any;

  constructor(private comentarioService: ComentariosServiceService) { }

  ngOnInit() {
    this.getAllComentarios();
  }

  getAllComentarios() {
    this.comentarioService.getAll().subscribe(
      (data: any) => {
        this.comentarios = data;
      },
      (error) => {
        console.error('Error fetching comments: ', error);
      }
    );
  }

  addComentario() {
    if (this.comentario && this.id_usuario && this.id_post && !isNaN(parseInt(this.id_usuario))&& !isNaN(parseInt(this.id_post))) {
      const newComment = {
        comentario: this.comentario,
        usuario: { id: parseInt(this.id_usuario) },
        post: { id: parseInt(this.id_post) }
      };

      this.comentarioService.addComentario(newComment).subscribe(
        (data: any) => {
          console.log('Comment added successfully: ', data);
          this.getAllComentarios();
          this.clearFields();
        },
        (error) => {
          console.error('Error adding comment: ', error);
        }
      );
    } else {
      console.error('Please fill all the fields and provide a valid user ID and a valid post ID');
    }
  }

  deleteComentario(id: number) {
    this.comentarioService.deleteComentario(id).subscribe(
      (data: any) => {
        console.log('Comment deleted successfully: ', data);
        this.getAllComentarios();
      },
      (error) => {
        console.error('Error deleting comment: ', error);
      }
    );
  }

  clearFields() {
    this.comentarioText = '';
    this.id_usuario = '';
    this.id_post = '';
  }

  updateComentario(comentarioToUpdate: any) {
    const updatedComment = {
      comentario: comentarioToUpdate.updatedComment,
      usuario: { id: parseInt(comentarioToUpdate.updatedUserID) },
      post: { id: parseInt(comentarioToUpdate.updatedPostID) }
    };
  
    // Verificar los valores aquí
    console.log('Updated Comment: ', updatedComment);
  
    this.comentarioService.updateComentario(comentarioToUpdate.id, updatedComment).subscribe(
      (data: any) => {
        console.log('Comment updated successfully: ', data);
        this.getAllComentarios();
      },
      (error: any) => {
        console.error('Error updating comment: ', error);
      }
    );
  }
  
}
