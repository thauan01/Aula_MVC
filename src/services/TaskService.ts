import { Task } from "../models/Task.js";

// Service: contém regras de negócio e validação
export class TaskService {
    private tasks: Task[] = [];
    private nextId = 1;

    // Retorna todas as tarefas
    getAll(): Task[] {
        return this.tasks;
    }

    // Retorna uma tarefa por ID ou null
    getOne(id: number): Task | null {
        if (Number.isNaN(id)) throw new Error("ID inválido");
        return this.tasks.find((t) => t.id === id) || null;
    }

    // Cria uma nova tarefa (validação dentro do service)
    create(title: string): Task {
        if (!title || typeof title !== "string") {
            throw new Error("Título inválido");
        }
        const task = new Task(this.nextId++, title);
        this.tasks.push(task);
        return task;
    }

    // Atualiza título e/ou status
    update(id: number, title?: string, done?: boolean): Task {
        if (Number.isNaN(id)) throw new Error("ID inválido");

        const task = this.tasks.find((t) => t.id === id);
        if (!task) throw new Error("Tarefa não encontrada");

        if (title !== undefined) {
            if (typeof title !== "string") throw new Error("Título inválido");
            task.title = title;
        }

        if (done !== undefined) {
            if (typeof done !== "boolean") throw new Error("Campo 'done' inválido");
            task.done = done;
        }

        return task;
    }

    // Remove e retorna true se removeu
    delete(id: number): boolean {
        if (Number.isNaN(id)) throw new Error("ID inválido");
        const before = this.tasks.length;
        this.tasks = this.tasks.filter((t) => t.id !== id);
        return this.tasks.length < before;
    }
}