<?php

namespace App\Http\Controllers;

use App\Services\TodoService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TodoController extends Controller
{
    protected TodoService $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
    }

    public function defaultTodos()
{
    try {
        $todos = $this->todoService->getAllTodos();
        return response()->json($todos, Response::HTTP_OK);
    } catch (\Exception $e) {
        return response()->json([
            'message' => $e->getMessage(),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


    public function createTodos(Request $request)
    {
        try {
            $this->todoService->createTodo($request->newId, $request->todo);
            return response()->json(Response::HTTP_OK);
        } catch (\Exception $e) {
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteTodos(Request $request)
    {
        try {
            $this->todoService->deleteTodo($request->newId);
            return response()->json(Response::HTTP_OK);
        } catch (\Exception $e) {
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateTodos(Request $request)
    {
        try {
            $this->todoService->updateTodo($request->newId, $request->todo);
            return response()->json(Response::HTTP_OK);
        } catch (\Exception $e) {
            return response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
