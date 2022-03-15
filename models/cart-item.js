class CartItem{
    constructor(prodTitle,freeShipping,productPriceOrigin,discount,productPrice,quantity,sum,note,ownerId,ownerName,address){
        this.prodTitle = prodTitle;
        this.freeShipping = freeShipping;
        this.productPriceOrigin = productPriceOrigin;
        this.discount = discount;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.sum = sum;
        this.note = note;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.address = address;
    }
}

export default CartItem;