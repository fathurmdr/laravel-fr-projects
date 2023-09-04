<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Contact;
use App\Models\SocialMedia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogPublicController extends Controller
{
    public function index(): Response
    {
        $contact = Contact::first();
        $social_media_list = SocialMedia::all();
        return Inertia::render('Blog/index', [
            'contact' => $contact,
            'social_media_list' => $social_media_list,
        ]);
    }

    public function list(Request $request): JsonResponse
    {
        $query = Blog::where([['title', '!=', null]]);

        if ($search = $request->search) {
            $query->orWhere('title', 'LIKE', '%' . $search . '%');
        }

        $query->orderBy('created_at', 'desc');

        $blogs = $query->paginate($request->size ?? 12)->withQueryString();
        return response()->json($blogs);
    }

    public function show(Blog $blog): Response
    {
        $contact = Contact::first();
        $social_media_list = SocialMedia::all();
        return Inertia::render('Blog/Show/index', [
            'blog' => $blog,
            'contact' => $contact,
            'social_media_list' => $social_media_list,
        ]);
    }
}
