class Product{
    constructor(id,ownerId,title,imageUrl,price,discount,freeShipping,stock,sold,reivew,discussion,rating,flashSale,description){
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.discount = discount;
        this.freeShipping = freeShipping;
        this.stock = stock;
        this.sold = sold;
        this.reivew = reivew;
        this.discussion = discussion;
        this.rating = rating;
        this.flashSale = flashSale;
        this.description = description;
    }
}
export default Product