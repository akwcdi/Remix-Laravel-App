<?php

namespace App\Services;

use App\Repositories\TodoRepository;

class TodoService
{
    protected TodoRepository $todoRepository;

    public function __construct(TodoRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    public function getAllTodos()
    {
        return $this->todoRepository->getAll();
    }

    public function createTodo(string $newId, string $todo)
    {
        $this->todoRepository->create($newId, $todo);
    }

    public function deleteTodo(string $newId)
    {
        $this->todoRepository->deleteByNewId($newId);
    }

    public function updateTodo(string $newId, string $todo)
    {
        $this->todoRepository->updateByNewId($newId, $todo);
    }
}
