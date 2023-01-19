<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
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


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

/**
 * logout: should be available only for logged-in users,
 * otherwise the $user object could not be created via
 * the '$request->user()' method...
 * see 'laravel-app/app/Http/Controllers/Api/AuthController.php'
 * and https://youtu.be/qJq9ZMB2Was?t=6412
 */
Route::middleware('auth:sanctum')->group(function () {
    Route::get(
        '/user',
        function (Request $request) {
            return $request->user();
        }
    );

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/users', UserController::class);
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
