<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function uploadImage(Request $request)
    {
        if ($request->hasFile('upload')) {
            $image = $request->file('upload');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);

            return response()->json(['uploaded' => true, 'url' => '/uploads/' . $imageName]);
        }

        return response()->json(['uploaded' => false, 'error' => 'An error occurred while uploading the image.']);
    }
}
