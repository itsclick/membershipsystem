<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class menus extends Model
{
    use HasFactory;

    protected $table = 'menus';

    // timestamps
    const CREATED_AT = 'cdate';
    const UPDATED_AT = 'updateddate';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($menu) {
            if (empty($menu->menu_id)) {
                $menu->menu_id = self::generateMenuId();
            }
        });
    }

    public static function generateMenuId()
    {
        do {
            $menu_id = 'M' . mt_rand(1000, 9999);
        } while (self::where('menu_id', $menu_id)->exists());

        return $menu_id;
    }
}
