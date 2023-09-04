<?php

namespace App\Http\Controllers;

use App\Mail\HomeEmailMessage;
use App\Models\Message;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class GuestMessageController extends Controller
{
    public function sendMessage(Request $request): RedirectResponse
    { 
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $contact = Contact::first();
       
        Mail::to($contact->email)->send(new HomeEmailMessage(data: $request->all(), admin : true));
        Mail::to($request->email)->send(new HomeEmailMessage(data: $request->all(), admin : false));

        Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        return back()->with('status', 'message-sent');
    }
}
