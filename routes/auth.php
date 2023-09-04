<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
  Route::get('admin/register', [RegisteredUserController::class, 'create'])
              ->name('register');

  Route::post('admin/register', [RegisteredUserController::class, 'store']);

  Route::get('admin/login', [AuthenticatedSessionController::class, 'create'])
  ->name('login');

  Route::post('admin/login', [AuthenticatedSessionController::class, 'store']);

});

Route::middleware('auth')->group(function () {
  Route::get('admin/verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

  Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');
  
  Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

  Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
              ->name('logout');
});