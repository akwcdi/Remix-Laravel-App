<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

Route::get('todos', [TodoController::class, 'defaultTodos']);
Route::post('todos/create', [TodoController::class, 'createTodos']);
Route::post('todos/delete', [TodoController::class, 'deleteTodos']);
Route::post('todos/update', [TodoController::class, 'updateTodos']);
