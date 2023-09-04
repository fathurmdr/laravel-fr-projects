<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class HomeEmailMessage extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public array $data, public bool $admin)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if ($this->admin) {
            return new Envelope(
                subject: 'Message From ' . $this->data['name'],
            );
        }
        return new Envelope(
            subject: 'Thank you ' . $this->data['name'] . ' for your message!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        if ($this->admin) {
            return new Content(
                view: 'emails.notifemailadmin',
                with: [
                    'data' => $this->data,
                    'pathToImage' => public_path('Logo FR.png'),
                ],
            );
        }
        return new Content(
            view: 'emails.notifemailguest',
            with: [
                'data' => $this->data,
                'pathToImage' => public_path('Logo FR.png'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
