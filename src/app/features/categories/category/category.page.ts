import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../category.service';
import { AlertController } from '@ionic/angular';
import { TaskService } from '../../tasks/task.service';
import { IonCard, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class CategoryPage {

  categoryService = inject(CategoryService);
  alertCtrl = inject(AlertController);
  taskService = inject(TaskService);

  async createCategory() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            this.categoryService.add(name);
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async editCategory(id: string, currentName: string) {
    const alert = await this.alertCtrl.create({
      header: 'Editar categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: currentName
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: (data) => {
            const name = (data?.name || '').trim();
            if (!name) return false;

            this.categoryService.update({ id, name });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  deleteCategory(id: string) {
    this.categoryService.delete(id);

    if (this.taskService.selectedCategory() === id) {
      this.taskService.selectedCategory.set(null);
    }
  }

}
