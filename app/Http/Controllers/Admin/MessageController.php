<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Message/index');
    }

    public function list(Request $request)
    {
        $query = Message::where('name', '!=', null);

        if ($search = $request->search) {
            $query->orWhere('name', 'LIKE', '%' . $search . '%');
            $query->orWhere('email', 'LIKE', '%' . $search . '%');
            $query->orWhere('message', 'LIKE', '%' . $search . '%');
        }

        if ($request->category === 'unread') {
            $query->where('read', false);
        }

        $query->orderBy('created_at', 'desc');

        $messages = $query->paginate($request->size ?? 10)->withQueryString();
        return response()->json($messages);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        $message->update([
            'read' => true
        ]);

        return Inertia::render('Admin/Message/Show/index', [
            'message' => $message
        ]);
    }

    public function getUnreadMessages()
    {
        $messages = Message::where('read', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($messages);
    }
}
