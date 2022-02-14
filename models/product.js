class Product{
    constructor(id,ownerId,title,imageUrl,description,price,discount,ongkir,address,stock,sale,rating,flashSale){
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.ongkir = ongkir;
        this.address = address;
        this.stock = stock;
        this.sale = sale;
        this.rating = rating;
        this.flashSale = flashSale;
    }
}
export default Product