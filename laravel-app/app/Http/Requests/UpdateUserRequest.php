<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
        // https://youtu.be/qJq9ZMB2Was?t=7259
        // unique:users,email," . $this->id >> unique:cable,column,exception
        // In this case the exception is the email of the user requested to be updated.
        return [
            'name' => 'required|string|max:60',
            'email' => "required|email|unique:users,email," . $this->id,
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
                    ->numbers()
            ]
        ];
    }
}
