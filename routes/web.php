<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\GuestMessageController;
use App\Http\Controllers\Admin\HeroController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\SocialMediaController;
use App\Http\Controllers\Admin\ImageController;
use App\Http\Controllers\BlogPublicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('app');
// });


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/send-message', [GuestMessageController::class, 'sendMessage'])->name('send_message');
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('blog', [BlogPublicController::class, 'index'])->name('blog_public');
Route::get('blog/list', [BlogPublicController::class, 'list'])->name('blog_public.list');
Route::get('blog/{blog:slug}', [BlogPublicController::class, 'show'])->name('blog_public.show');

// admin
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('admin', function () {
        return Inertia::render('Admin/DashboardPage');
    })->name('dashboard');

    Route::get('admin/message/list', [MessageController::class, 'list'])->name('message.list');
    Route::get('admin/message/unread', [MessageController::class, 'getUnreadMessages'])->name('message.unread');
    Route::resource('admin/message', MessageController::class)
        ->only(['index', 'show']);

    Route::resource('admin/hero', HeroController::class)
        ->only(['index', 'update']);

    Route::resource('admin/project', ProjectController::class)
        ->only(['index', 'create', 'store', 'update', 'edit', 'destroy']);
    Route::get('admin/project/list', [ProjectController::class, 'list'])->name('project.list');

    Route::resource('admin/skill', SkillController::class)
        ->only(['index', 'create', 'store', 'update', 'edit', 'destroy']);
    Route::get('admin/skill/list', [SkillController::class, 'list'])->name('skill.list');

    Route::resource('admin/resume/education', EducationController::class)
        ->only(['index', 'create', 'store', 'update', 'edit', 'destroy']);
    Route::get('admin/resume/education/list', [EducationController::class, 'list'])->name('education.list');

    Route::resource('admin/resume/experience', ExperienceController::class)
        ->only(['index', 'create', 'store', 'update', 'edit', 'destroy']);
    Route::get('admin/resume/experience/list', [ExperienceController::class, 'list'])->name('experience.list');

    Route::resource('admin/setting/contact', ContactController::class)
        ->only(['index', 'update']);

    Route::resource('admin/setting/social_media', SocialMediaController::class)
        ->only(['index', 'update', 'edit']);
    Route::get('admin/setting/social_media/list', [SocialMediaController::class, 'list'])->name('social_media.list');

    Route::resource('admin/blog', BlogController::class)
        ->only(['index', 'create', 'store', 'update', 'edit', 'destroy']);
    Route::get('admin/blog/list', [BlogController::class, 'list'])->name('blog.list');
    Route::get('admin/blog/create-slug', [BlogController::class, 'createSlug'])->name('blog.create-slug');

    Route::post('/upload-image', [ImageController::class, 'uploadImage']);
});


require __DIR__ . '/auth.php';
