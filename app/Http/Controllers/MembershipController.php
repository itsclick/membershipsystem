<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Membership_model;
use Illuminate\Support\Facades\Validator;

class MembershipController extends Controller
{
    //

    public function savemembers(Request $request)
{
    $validator = Validator::make($request->all(), [
        'gid'     => 'required|string|max:255',
        'fname'   => 'required|string|max:255',
        'lname'   => 'required|string|max:255',
        'tele'    => 'required|string|max:255',
        'email'   => 'required|string|max:255',
        'address' => 'required|string|max:255',
        'gender'  => 'required|string|max:10',
        'image'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ], [
        'gid.required'    => 'Group ID is required',
        'fname.required'  => 'First Name is required',
        'lname.required'  => 'Last Name is required',
        'tele.required'   => 'Telephone is required',
        'email.required'  => 'Email is required',
        'address.required'=> 'Address is required',
        'gender.required' => 'Gender is required',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()->all()
        ], 422);
    }

    // ✅ Handle image upload
    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')
            ->store('members', 'public');
    }

    // ✅ Save member
    $member = new Membership_model();
    $member->gid     = $request->gid;
    $member->fname   = $request->fname;
    $member->lname   = $request->lname;
    $member->tele    = $request->tele;
    $member->email   = $request->email;
    $member->address = $request->address;
    $member->gender  = $request->gender;
    $member->image   = $imagePath; // ✅ save image path

    $member->save();

    return response()->json([
        'okay' => true,
        'msg'  => 'Member record saved successfully',
        'data' => $member
    ]);
}


        

    //getallmembers

    public function getmembers(){
        $getmembers = Membership_model::paginate(10);
        return response()->json([
            "okay"=>true,
            "msg"=>"success",
            "data"=>$getmembers
        ]);
    }

    //get membership by id
    public function memberbyid($id){
        $memberbyid = Membership_model::find($id);
        if(!$memberbyid){
            return response()->json([
                "okay"=>false,
                "msg"=>"No Member ID found",
                "data"=>null
            ],404);
        }
            return response()->json([
                "okay"=>true,
                "msg"=>"sucess",
                "data"=>$memberbyid
            ]);
        
    
}

public function updatemember(Request $request, $id)
{
    $member = Membership_model::find($id);

    if (!$member) {
        return response()->json([
            "okay" => false,
            "msg"  => "No Member found"
        ], 404);
    }

    // ✅ Validation
    $request->validate([
        'gid'     => 'required|string|max:255',
        'fname'   => 'required|string|max:255',
        'lname'   => 'required|string|max:255',
        'tele'    => 'required|string|max:255',
        'email'   => 'required|string|max:255',
        'address' => 'required|string|max:255',
        'gender'  => 'required|string|max:10',
        'image'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    // ✅ Handle image upload ONLY if a new image is sent
    if ($request->hasFile('image')) {

        

        $member->image = $request->file('image')
            ->store('members', 'public');
    }

    // ✅ Update other fields
    $member->gid     = $request->gid;
    $member->fname   = $request->fname;
    $member->lname   = $request->lname;
    $member->tele    = $request->tele;
    $member->email   = $request->email;
    $member->address = $request->address;
    $member->gender  = $request->gender;

    // ❌ DO NOT update mid

    $member->save();

    return response()->json([
        "okay" => true,
        "msg"  => "Membership record updated successfully",
        "data" => $member
    ]);
}



            //delete membership
            public function deletemember($id){
                $deletemember = Membership_model::find($id);
                if(!$deletemember){
                    return response()->json([
                        "okay"=>false,
                        "msg"=>"No Member found",
                        "data"=>null
                    ],404);
                }
                $deletemember->delete();
                return response()->json([
                    "okay"=>true,
                    "msg"=>"Membership Data Deleted Successuly",
                    "data"=> $deletemember
                ]);
            }

                //count total member and by gender
            public function countmembers(){
                $countmembers = Membership_model::count();
                $totalmale = Membership_model::where('gender','Male')->count();
                $totalfemale = Membership_model::where('gender','Female')->count();
                return response ()->json([
                   'totalmembers' =>  $countmembers,
                   'totalmale' =>  $totalmale,
                   'totalfemale' =>  $totalfemale
            
                ]);
            }


          

                public function countMembersPerGroup()
                {
                $data = DB::table('cgroups as g')
                ->leftJoin('member as m', 'm.gid', '=', 'g.gid')
                ->select(
                'g.gid',
                'g.gname',
                DB::raw('COUNT(m.mid) as total_members')
                )
                ->groupBy('g.gid', 'g.gname')
                ->get();

                return response()->json([
                'data' => $data
                ]);
}
        




}
