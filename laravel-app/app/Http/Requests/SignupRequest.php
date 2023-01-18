<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // unique:user,email >> ruleName:tableName,columnName
        // https://youtu.be/qJq9ZMB2Was?t=5192
        // |unique:user,email
        return [
            'name' => 'required|string|max:60',
            'email' => "required|email|unique:users,email",
            'password' => [
                'required',
                'confirmed',
                Password::min(4)
                    ->letters()
                // ->symbols()
                // ->numbers()
            ]
        ];
    }
}
