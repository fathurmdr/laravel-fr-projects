<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Skill/index');
    }

    public function list(Request $request): JsonResponse
    {
        $query = Skill::where('title', '!=', null);

        if ($search = $request->search) {
            $query->orWhere('title', 'LIKE', '%' . $search . '%');
        }

        if ($sort = $request->sort) {
            $dir = $request->dir ?? 'asc';
            $query->orderBy($sort, $dir);
        }
        $skill = $query->paginate($request->size ?? 10)->withQueryString();
        return response()->json($skill);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Skill/Create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Skill $skill): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|mimes:jpg,jpeg,png,gif,svg|max:1024',
        ]);

        $fileName = time() . '.' . $request->icon->extension();
        $request->icon->move(public_path('uploads'), $fileName);

        $skill->create([
            'title' => $request->title,
            'icon' => $fileName,
        ]);

        return redirect(route('skill.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        return Inertia::render('Admin/Skill/Edit/index', [
            'skill' => Skill::find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Skill $skill): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'nullable|mimes:jpg,jpeg,png,gif,svg|max:1024',
        ]);


        if ($request->hasFile('icon')) {
            $fileName = time() . '.' . $request->icon->extension();
            $request->icon->move(public_path('uploads'), $fileName);

            $skill->update([
                'title' => $request->title,
                'icon' => $fileName,
            ]);
        } else {

            $skill->update([
                'title' => $request->title,
            ]);
        }

        return redirect(route('skill.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();
        return redirect(route('skill.index'));
    }
}
