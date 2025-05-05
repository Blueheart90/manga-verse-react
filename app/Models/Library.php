<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
    protected $fillable = [
        'user_id',
        'manga_id',
        'status',
        'recommended',
        'notes',
    ];

    protected $cast = [
        'status' => StatusEnum::class,
    ];
}
