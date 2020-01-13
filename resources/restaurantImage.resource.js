"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RestaurantImageResource {
    constructor(restaurantImageData) {
        this.setRestaurantIndex(restaurantImageData.restaurantIndex);
        this.setUrl(restaurantImageData.url);
    }
    getRestaurantIndex() {
        return this.restaurantIndex;
    }
    setRestaurantIndex(restaurantIndex) {
        this.restaurantIndex = restaurantIndex;
    }
    getUrl() {
        return this.url;
    }
    setUrl(url) {
        this.url = url;
    }
    getRestaurantImage() {
        let restaurantImageData = {
            restaurantIndex: this.getRestaurantIndex(),
            url: this.getUrl()
        };
        return restaurantImageData;
    }
}
exports.RestaurantImageResource = RestaurantImageResource;
//# sourceMappingURL=restaurantImage.resource.js.map