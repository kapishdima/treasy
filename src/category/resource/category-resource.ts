import { Resource } from 'src/shared/http';

export class CategoryResource extends Resource {
  public static toObject(category: any) {
    return {
      id: category.id,
      name: category.name,
    };
  }

  public static toArray(categories: any[]) {
    return categories.map(this.toObject);
  }
}
