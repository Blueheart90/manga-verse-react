<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Manga extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $keyType = 'string'; // Indica que la clave primaria es un string (UUID)
    public $incrementing = false; // Desactiva el autoincremento
    protected $fillable = ['id', 'title', 'cover_url'];
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function library(): HasMany
    {
        return $this->hasMany(Library::class);
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class);
    }
}
