"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let TodoItem = class TodoItem {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Object)
], TodoItem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TodoItem.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TodoItem.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], TodoItem.prototype, "completed", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created", type: "timestamptz" }),
    __metadata("design:type", Date)
], TodoItem.prototype, "created", void 0);
TodoItem = __decorate([
    typeorm_1.Entity()
], TodoItem);
exports.TodoItem = TodoItem;
//# sourceMappingURL=entities.js.map