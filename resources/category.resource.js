"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryResource {
    constructor(categoryData) {
        this.setCategoryName(categoryData.categoryName);
    }
    getCategoryName() {
        return this.categoryName;
    }
    setCategoryName(categoryName) {
        this.categoryName = categoryName;
    }
    getCategory() {
        let categoryData = {
            categoryName: this.getCategoryName()
        };
        return categoryData;
    }
}
exports.CategoryResource = CategoryResource;
//# sourceMappingURL=category.resource.js.map