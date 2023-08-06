<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class TodoController extends Controller
{
    public function defaultTodos(Request $request)
    {
        try {
            $todos = Todo::all();

            return response()->json($todos, Response::HTTP_OK);
        } catch (Exception $e) {
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createTodos(Todo $todo, Request $request)
    {
        try {
            $todo->firstOrCreate(['newId' => $request->newId, 'todos' => $request->todo]);

            return response()->json(Response::HTTP_OK);
        } catch (Exception $e) {
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteTodos(Todo $todo, Request $request)
    {
        try {
            $todo->where('newId', $request->newId)->delete();

            return response()->json(Response::HTTP_OK);
        } catch (Exception $e) {
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
