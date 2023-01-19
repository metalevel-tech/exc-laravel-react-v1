<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Unwrap: By default this property is $wrap='data',
     * so at the frontend we need to: `setUser(data.data);`,
     * see: 'react-app/src/views/UserForm.jsx'
     * If we change it to 'false' the wrapper object 'data'
     * will be disabled.
     */
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        // Return an array of the data we want to expose to the user
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}
