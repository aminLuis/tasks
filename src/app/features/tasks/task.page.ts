import { Component, inject, signal } from '@angular/core';
import { TaskService } from './task.service';
import { CategoryService } from '../categories/category.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, IonList, IonCheckbox, IonLabel } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

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
    IonLabel
],

})
export class TaskPage {

  newTask = signal('');
  selectedCategory = signal<string | null>(null);

  taskService = inject(TaskService);
  categoryService = inject(CategoryService);

  addTask() {
    const value = this.newTask().trim();
    if (!value) return;

    this.taskService.add(value, this.selectedCategory() || undefined);
    this.newTask.set('');
  }

  setFilter(categoryId: string | null) {
    this.taskService.selectedCategory.set(categoryId);
  }

}

