<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/todos', 'TodoController@defaultTodos');
Route::post('/todos/create', 'TodoController@createTodos');
Route::post('/todos/delete', 'TodoController@deleteTodos');
Route::post('/todos/update', 'TodoController@updateTodos');
