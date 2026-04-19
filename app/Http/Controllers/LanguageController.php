<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function switch($locale)
    {
        try {
            if (in_array($locale, ['en', 'id'])) {
                App::setLocale($locale);
                Session::put('locale', $locale);
            }

            $locale = Session::get('locale', config('app.locale'));

            return redirect()->back()->with('toast', ['type' => 'success', 'message' => __('Language switched to :language.', ['language' => $locale])]);
        } catch (\Exception $e) {
            return redirect()->back()->with('toast', ['type' => 'error', 'message' => __('Failed to switch language.')]);
        }
    }
}
