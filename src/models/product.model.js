export class ProductModel {
    constructor(id, name, description, stock, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stock = stock || 0;
        this.price = price;
        this.category = category || 'General';
    }
}