<?php

namespace App\Repositories;

use App\Models\Todo;

class TodoRepository
{
    public function getAll()
    {
        return Todo::all();
    }

    public function create(string $newId, string $todo)
    {
        Todo::firstOrCreate([
            'newId' => $newId,
            'todos' => $todo,
        ]);
    }

    public function deleteByNewId(string $newId)
    {
        Todo::where('newId', $newId)->delete();
    }

    public function updateByNewId(string $newId, string $todo)
    {
        $updateTodo = Todo::where('newId', $newId)->first();

        if ($updateTodo) {
            $updateTodo->todos = $todo;
            $updateTodo->save();
        }
    }
}
