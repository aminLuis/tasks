import { Component, OnInit, signal } from '@angular/core';
import { TaskService } from './task.service';
import { CategoryService } from '../categories/category.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonCheckbox, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonList,
    IonCheckbox,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
],

})
export class TaskPage {

  newTask = signal('');
  selectedCategory = signal<string | null>(null);

  constructor(
    public taskService: TaskService,
    public categoryService: CategoryService,
    private alertCtrl: AlertController
  ) { }

  addTask() {
    const value = this.newTask().trim();
    if (!value) return;

    this.taskService.add(value, this.selectedCategory() || undefined);
    this.newTask.set('');
  }

  setFilter(categoryId: string | null) {
    this.taskService.selectedCategory.set(categoryId);
  }

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
