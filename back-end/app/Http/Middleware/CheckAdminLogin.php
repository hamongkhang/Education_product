<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckAdminLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $adminFind = auth()->user();
        if($adminFind){
            if (auth()->user()->email=="web.vatly365@gmail.com") {
                return $next($request);
            }
            else if($adminFind = DB::table('admin_account')
                ->where('email', auth()->user()->email)
                ->where('password',auth()->user()->password)->first()){
                return $next($request);
            }
            else{
                return response() -> json([
                    'url'=> '/admin'
                ]);
            }
        }
        else{
            return response() -> json([
                'url'=> '/admin'
            ]);
        }
        
    }
}
