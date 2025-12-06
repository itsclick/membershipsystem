<?php

namespace App\Http\Controllers;

use App\Models\loginModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class login_controller extends Controller
{
    //

    



                            public function login(Request $request)
                            {


                                $validator = Validator::make(
                                    $request->all(),
                                    [
                                        "username" => "required",
                                        "password" => "required",
                                    ]
                                );

                                // Payload to be sent with response
                                $payload = [
                                    "ok" => false,
                                ];

                            if ($validator->fails()) {
                                    $payload["message"] = "Login failed.";
                                    $payload["errors"] = [
                                        "message" => join(" ", $validator->errors()->all()),
                                    
                                    ];
                                    return response($payload,422);
                                }

                                $authenticatedUser = loginModel::where("username", strtoupper($request->username))
                                                            
                                                            ->select(['*'])
                                                            ->first();


                                // Return if no user is found
                                if (empty($authenticatedUser)) {
                                    $payload["message"] = "The provided credentials are incorrect";
                                    return response()->json($payload,422);
                                }

                                // Return if password is invalid
                                if (!Hash::check($request->password, $authenticatedUser->password)) {
                                    $payload["message"] = "The provided credentials are incorrect.";
                                    return response()->json($payload, 422);
                                }

                                try {
                                     // Generate secure unique token
                                    $token = bin2hex(random_bytes(32));
                            
                                    $authenticatedUser->last_login_at = Carbon::now()->toDateTimeString();
                                    $authenticatedUser->last_login_ip = $request->getClientIp();
                                    $authenticatedUser->login_token =  $token;
                                    $authenticatedUser->save();

                                    return response(['user' => $authenticatedUser, 'access_token' => $token], 200);

                                } catch (\Exception $th) {
                                        return response()->json([
                                            "ok" => false,
                                            "msg" => "An internal error occured. Reset failed",
                                            "error" => [
                                                "msg" => $th->__toString(),
                                                "fix" => "Error is explained in fix",
                                            ]
                                        ]);
                                }



                            }






        public function saveusers (Request $request){

            $validator = Validator::make($request->all(), [
                'username' => 'required|string|max:200|unique:users',
                'password' => 'required|string|max:255',
                
    
              ],[
                  // This has our own custom error messages for each validation
                  "username.required" => "username is required",
                  "password.required" => "password is required"
                 
                
                   ]);
        
              if ($validator->fails()) {
                  return response(['errors'=>$validator->errors()->all()], 422);
              }
                
                // Insert
                $insert = new loginModel();
                $insert->username = $request->username;
                $insert->password = Hash::make($request['password']);
                
                
        
        
                $insert -> save();
        
                return response()->json([
                    "okay" => true,
                    "msg" => "New user Saved successfully"
                ]);
            }


           // getll users
        public function getallusers(){
            $allusers = loginModel::paginate(10);

            return response () -> json([
                "okay" =>true,
                "msg"=>"Success",
                "data" => $allusers
            ]);
        }



        //get due by ID. This can be used for dues payment receipt
        public function usersbyid($id){
            $getuserbyid = loginModel::find($id);

            if(!$getuserbyid ){
                return response () ->json([
                    "okay" => false,
                    "msg" => "users Id not found",
                    "data" => null
                ],404);
            }

            return response() -> json([
                "okay" => true,
                "msg" => "Success",
                "data" =>$getuserbyid
            ]);


        }
}
