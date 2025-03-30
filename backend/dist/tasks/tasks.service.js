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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTasks(user, { page, limit }) {
        const [tasks, total] = await this.taskRepository.findAndCount({
            where: { userId: user.id },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            tasks,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async createTask(createTaskDto, user) {
        const task = this.taskRepository.create(Object.assign(Object.assign({}, createTaskDto), { userId: user.id }));
        return this.taskRepository.save(task);
    }
    async updateTask(id, updateTaskDto, user) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        if (task.userId !== user.id) {
            throw new common_1.UnauthorizedException('You can only update your own tasks');
        }
        Object.assign(task, updateTaskDto);
        return this.taskRepository.save(task);
    }
    async deleteTask(id, user) {
        const result = await this.taskRepository.delete({ id, userId: user.id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found or you're not authorized to delete it`);
        }
    }
    async completeTask(id, user) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found`);
        }
        if (task.userId !== user.id) {
            throw new common_1.UnauthorizedException('You can only complete your own tasks');
        }
        task.completed = true;
        return this.taskRepository.save(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map