<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */
    'facebook' => [
        'client_id' => '417850356370047',
        'client_secret' => '04bf150d7816b8d772e38060b9a8713d',
        'redirect' => 'http://localhost:8000/api/auth/facebook/callback',
    ],
    'google' => [
        'client_id' => '957199418674-uvmd8qbvg60fb1gqs73gi4t5f2q0qg9b.apps.googleusercontent.com',
        'client_secret' => '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',
        'redirect' => 'http://127.0.0.1:8000/api/callback/google',
      ], 
    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

];
