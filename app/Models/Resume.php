<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    use HasFactory;

    protected $table = 'resume';

    protected $fillable = [
        'title',
        'start_year',
        'end_year',
        'institution',
        'company',
        'type'
    ];

    public function activities(): HasMany
    {
        return $this->hasMany(ResumeActivity::class);
    }
}
