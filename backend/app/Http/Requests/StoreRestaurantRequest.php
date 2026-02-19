<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',

            'hours' => 'required|array|min:1',

            'hours.*.day_of_week' => 'required|integer|between:0,6',
            'hours.*.open_time' => 'required|date_format:H:i',
            'hours.*.close_time' => 'required|date_format:H:i',
        ];
    }
}
