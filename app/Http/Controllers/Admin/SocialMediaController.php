<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialMediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Setting/SocialMedia/index');
    }

    public function list(Request $request)
    {
        $query = SocialMedia::where('platform', '!=', null);

        if ($search = $request->search) {
            $query->orWhere('platform', 'LIKE', '%' . $search . '%');
        }

        if ($sort = $request->sort) {
            $dir = $request->dir ?? 'asc';
            $query->orderBy($sort, $dir);
        }
        $social_media_list = $query->paginate($request->size ?? 10)->withQueryString();
        return response()->json($social_media_list);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SocialMedia $social_media)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Admin/Setting/SocialMedia/Edit/index', [
            'social_media' => SocialMedia::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, SocialMedia $social_media): RedirectResponse
    {
        $request->validate([
            'url' => 'required|string|max:255',
        ]);

        $social_media->where('id', $id)->update([
            'url' => $request->url,
        ]);

        return redirect(route('social_media.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialMedia $social_media)
    {
        //
    }
}
