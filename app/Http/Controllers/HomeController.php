<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\SocialMedia;
use App\Models\Hero;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Resume;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index()
    {
        $contact = Contact::first();
        $social_media_list = SocialMedia::all();
        $hero = Hero::first();
        $blogs = Blog::orderBy('created_at', 'desc')
            ->take(10)
            ->get();
        $projects = Project::all();
        $skills = Skill::all();
        $educations = Resume::with('activities')->where('type', 'education')->get();
        $experiences = Resume::with('activities')->where('type', 'experience')->get();
        return Inertia::render('HomePage', [
            'contact' => $contact,
            'social_media_list' => $social_media_list,
            'hero' => $hero,
            'blogs' => $blogs,
            'projects' => $projects,
            'skills' => $skills,
            'educations' => $educations,
            'experiences' => $experiences,
        ]);
    }
}
