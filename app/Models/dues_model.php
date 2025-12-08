<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dues_model extends Model
{
    use HasFactory;

    public $table='mdues';
    protected $primaryKey = 'id';
    const CREATED_AT='cdate';
    const UPDATED_AT='updateddate';

    protected $fillable = [
        'did',
        'mid',
        'gid',
        'amt',
        'pdate',
        'pmonth',
        
    ];

    /**
     * Boot method to auto-generate unique MID
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($duesid) {
            $duesid->did = self::generateduesId();
        });
    }

    /**
     * Generate a unique membership ID
     */
    public static function generateduesId()
    {
        do {
            $did = "DID" . rand(10000000, 99999999);
        } while (self::where('id', $did)->exists());

        return $did;
    }

  
}



