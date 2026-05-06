import { effect, Injectable, signal } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Category } from './category.model';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 private _categories = signal<Category[]>(this.storage.get<Category>(KEY));

  categories = this._categories.asReadonly();

  constructor(private storage: StorageService) {
    effect(() => {
      this.storage.set(KEY, this._categories());
    });
  }

  add(name: string) {
    this._categories.update(cats => [
      ...cats,
      { id: uuidv4(), name }
    ]);
  }

  update(category: Category) {
    this._categories.update(cats =>
      cats.map(c => c.id === category.id ? category : c)
    );
  }

  delete(id: string) {
    this._categories.update(cats =>
      cats.filter(c => c.id !== id)
    );
  }

}
