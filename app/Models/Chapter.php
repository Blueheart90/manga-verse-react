<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chapter extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'external_id',
        'volume',
        'chapter',
        'pages',
    ];
    public function manga(): BelongsTo
    {
        return $this->belongsTo(Manga::class);
    }

    public function chapterComments(): HasMany
    {
        return $this->hasMany(ChapterComment::class);
    }
}
