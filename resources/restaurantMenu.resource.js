"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestaurantMenuResource {
    constructor(restaurantMenuData) {
        this.setRestaurantIndex(restaurantMenuData.restaurantIndex);
        this.setName(restaurantMenuData.name);
        this.setPrice(restaurantMenuData.price);
        this.setPriority(restaurantMenuData.priority);
        this.setImageUrl(restaurantMenuData.imageUrl);
    }
    getRestaurantIndex() {
        return this.restaurantIndex;
    }
    setRestaurantIndex(restaurantIndex) {
        this.restaurantIndex = restaurantIndex;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        this.priority = priority;
    }
    getImageUrl() {
        return this.imageURL;
    }
    setImageUrl(imageUrl) {
        this.imageURL = imageUrl;
    }
    getRestaurantMenu() {
        let restaurantMenuData = {
            restaurantIndex: this.getRestaurantIndex(),
            name: this.getName(),
            price: this.getPrice(),
            priority: this.getPriority(),
            imageUrl: this.getImageUrl()
        };
        return restaurantMenuData;
    }
}
exports.RestaurantMenuResource = RestaurantMenuResource;
//# sourceMappingURL=restaurantMenu.resource.js.map