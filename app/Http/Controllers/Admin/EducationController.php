<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use App\Models\ResumeActivity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Resume/Education/index');
    }

    public function list(Request $request)
    {
        $query = Resume::where([['type', '=', 'education']]);

        if ($search = $request->search) {
            $query->orWhere('title', 'LIKE', '%' . $search . '%');
        }

        if ($sort = $request->sort) {
            $dir = $request->dir ?? 'asc';
            $query->orderBy($sort, $dir);
        }
        $education = $query->paginate($request->size ?? 10)->withQueryString();
        return response()->json($education);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Resume/Education/Create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Resume $resume): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'start_year' => 'required|integer|min:2000',
            'end_year' => 'required|integer|min:2000',
            'institution' => 'required|string|max:255',
            'activities.*.description' => 'required|string|max:255',
        ]);

        $newResume = $resume->create([
            'title' => $request->title,
            'start_year' => $request->start_year,
            'end_year' => $request->end_year,
            'institution' => $request->institution,
            'type' => 'education',
        ]);

        foreach ($request->activities as $activity) {
            $newResume->activities()->create([
                'description' => $activity['description'],
            ]);
        }

        return redirect(route('education.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Admin/Resume/Education/Edit/index', [
            'education' => Resume::with('activities')->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'start_year' => 'required|integer|min:2000',
            'end_year' => 'required|integer|min:2000',
            'institution' => 'required|string|max:255',
            'activities.*.description' => 'required|string|max:255',
        ]);

        $resume = Resume::with('activities')->find($id);

        $resume->update([
            'title' => $request->title,
            'start_year' => $request->start_year,
            'end_year' => $request->end_year,
            'institution' => $request->institution,
            'type' => 'education',
        ]);

        $resume->activities()->delete();

        foreach ($request->activities as $activity) {
            $resume->activities()->create([
                'description' => $activity['description'],
            ]);
        }

        return redirect(route('education.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        Resume::with('activities')->find($id)->delete();

        return redirect(route('education.index'));
    }
}
