<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['title', 'slug', 'image', 'content', 'status', 'views', 'author_id'])]
class Article extends Model
{
    public function author(): BelongsTo {
        return $this->belongsTo(User::class, 'author_id');
    }
}
