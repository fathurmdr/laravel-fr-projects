<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/HeroPage', [
            'hero' => Hero::first()
        ]);
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
    public function show(Hero $hero)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Hero $hero)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hero $hero): RedirectResponse
    { 
        
        $request->validate([
            'name' => 'required|string|max:255',
            'tagline' => 'required|string|max:255',
            'tagline_bold' => 'string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'nullable|mimes:png,svg|max:2048',
        ]);
        

        if ($request->hasFile('image')) {
            
            $fileName = time().'.'.$request->image->extension(); 
            $request->image->move(public_path('uploads'), $fileName); 

            $hero->update([
                'name' => $request->name,
                'tagline' => $request->tagline,
                'tagline_bold' => $request->tagline_bold,
                'description' => $request->description,
                'image' => $fileName,
            ]);
        } else {
            $hero->update([
                'name' => $request->name,
                'tagline' => $request->tagline,
                'tagline_bold' => $request->tagline_bold,
                'description' => $request->description,
            ]);
        }
 
        return redirect(route('hero.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hero $hero)
    {
        //
    }
}
