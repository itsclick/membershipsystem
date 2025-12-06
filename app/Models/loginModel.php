<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class loginModel extends Model
{
    use HasFactory;

    public $table='users';
    protected $primaryKey = 'id';
    public $incrementing = false;
    const CREATED_AT='created_at';
    const UPDATED_AT = "updated_at";

    

    
}




    
   
   

