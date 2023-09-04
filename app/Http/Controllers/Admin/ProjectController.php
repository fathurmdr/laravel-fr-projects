<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Project/index');
    }

    public function list(Request $request)
    {
        $query = Project::where('title', '!=', null);

        if ($search = $request->search) {
            $query->orWhere('title', 'LIKE', '%' . $search . '%');
        }
    
        if ($sort = $request->sort) {
            $dir = $request->dir ?? 'asc';
            $query->orderBy($sort, $dir);
        }
        $project = $query->paginate($request->size ?? 10)->withQueryString();
        return response()->json($project);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Project/Create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Project $project): RedirectResponse
    { 
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'url' => 'nullable|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $fileName = time().'.'.$request->image->extension(); 
        $request->image->move(public_path('uploads'), $fileName); 

        $project->create([
            'title' => $request->title,
            'image' => $fileName,
            'url' => $request->url,
            'description' => $request->description,
        ]);
 
        return redirect(route('project.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Admin/Project/Edit/index', [
            'project' => Project::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project): RedirectResponse
    { 
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'url' => 'nullable|string|max:255',
            'description' => 'required|string|max:255',
        ]);

       
        if ($request->hasFile('image')) {  
            $fileName = time().'.'.$request->image->extension(); 
            $request->image->move(public_path('uploads'), $fileName); 

            $project->update([
                'title' => $request->title,
                'image' => $fileName,
                'url' => $request->url,
                'description' => $request->description,
            ]);
        } else {
            
            $project->update([
                'title' => $request->title,
                'url' => $request->url,
                'description' => $request->description,
            ]);
        }
 
        return redirect(route('project.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete(); 
        return redirect(route('project.index'));
    }
}
