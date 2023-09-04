<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Cviebrock\EloquentSluggable\Services\SlugService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Blog/index');
    }

    public function list(Request $request): JsonResponse
    {
        $query = Blog::where([['title', '!=', null],]);

        if ($search = $request->search) {
            $query->orWhere('title', 'LIKE', '%' . $search . '%');
        }

        $query->orderBy('created_at', 'desc');

        $blogs = $query->paginate($request->size ?? 12)->withQueryString();
        return response()->json($blogs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Blog/Create/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Blog $blog): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|unique:blogs|string|max:255',
            'cover_image' => 'required|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'content' => 'required|string',
        ]);

        $fileName = time() . '.' . $request->cover_image->extension();
        $request->cover_image->move(public_path('uploads'), $fileName);

        $blog->create([
            'title' => $request->title,
            'slug' => $request->slug,
            'cover_image' => $fileName,
            'content' => $request->content,
        ]);

        return redirect(route('blog.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog): Response
    {
        return Inertia::render('Admin/Blog/Edit/index', [
            'blog' => $blog,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'cover_image' => 'nullable|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'content' => 'required|string',
        ]);

        if ($request->hasFile('cover_image')) {
            $fileName = time() . '.' . $request->cover_image->extension();
            $request->cover_image->move(public_path('uploads'), $fileName);

            $blog->update([
                'title' => $request->title,
                'slug' => $request->slug,
                'cover_image' => $fileName,
                'content' => $request->content,
            ]);
        } else {

            $blog->update([
                'title' => $request->title,
                'slug' => $request->slug,
                'content' => $request->content,
            ]);
        }

        return redirect(route('blog.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog): JsonResponse
    {
        $blog->delete();
        return response()->json(['message' => 'OK']);
    }

    public function createSlug(Request $request): JsonResponse
    {
        $slug = SlugService::createSlug(Blog::class, 'slug', $request->title);

        return response()->json(['slug' => $slug]);
    }
}
