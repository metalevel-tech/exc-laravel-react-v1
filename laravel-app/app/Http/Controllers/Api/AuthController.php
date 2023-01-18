<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var User $user */
        $user = (new User)->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        // From TheCodeholic guide:
        // $user = User::create();

        // Create a token named 'main'.
        // The 'plainTextToken' is available for just created tokens,
        // you can't get the token in plain text later!
        $token = $user->createToken('main')->plainTextToken;

        /**
        * Return the two variables 'user' and 'token',
        * as it is expected on the client side.
        * The array returned here will become
        * the 'data' object on the client side,
        * for example see: react-app/src/views/Signup.jsx
        *
        return response(['user' => $user, 'token' => $token]);
        */
        // Other way is to use the compact() function, as this:
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            // HTTP 401 Unauthorized:
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
            return response(
                [
                    'message' => 'Provided email or password is incorrect.'
                ],
                401
            );
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    /**
     * Summary of logout: should be available only for logged-in users,
     * otherwise the $user object could not be created via
     * the '$request->user()' method...
     * see 'laravel-app/routes/api.php' and https://youtu.be/qJq9ZMB2Was?t=6412
     */
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
