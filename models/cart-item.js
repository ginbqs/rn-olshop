class CartItem{
    constructor(prodTitle,imageUrl,freeShipping,productPriceOrigin,discount,productPrice,quantity,sum,note,ownerId,ownerName,ownerLogo,address,isChecked){
        this.prodTitle = prodTitle;
        this.imageUrl = imageUrl;
        this.freeShipping = freeShipping;
        this.productPriceOrigin = productPriceOrigin;
        this.discount = discount;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.sum = sum;
        this.note = note;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.ownerLogo = ownerLogo;
        this.address = address;
        this.isChecked = isChecked;
    }
}

export default CartItem;