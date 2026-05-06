import { computed, effect, Injectable, signal } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Task } from './task.model';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

private _tasks = signal<Task[]>(this.storage.get<Task>(KEY));

selectedCategory = signal<string | null>(null);

  tasks = computed(() => {
    const category = this.selectedCategory();
    const all = this._tasks();

    if (!category) return all;

    return all.filter(t => t.categoryId === category);
  });

constructor(private storage: StorageService) {
    effect(() => {
      this.storage.set(KEY, this._tasks());
    });
  }

   add(title: string, categoryId?: string) {
    this._tasks.update(tasks => [
      ...tasks,
      {
        id: uuidv4(),
        title,
        completed: false,
        categoryId
      }
    ]);
  }

  toggle(id: string) {
    this._tasks.update(tasks =>
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  delete(id: string) {
    this._tasks.update(tasks =>
      tasks.filter(t => t.id !== id)
    );
  }

}
