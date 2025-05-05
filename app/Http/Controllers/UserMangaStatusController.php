<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use Illuminate\Http\Request;
use App\Models\UserMangaStatus;
use Illuminate\Support\Facades\Auth;

class UserMangaStatusController extends Controller
{
    public function show($manga)
    {
        $status = UserMangaStatus::where([
            'manga_id' => $manga,
            'user_id' => Auth::id(),
        ])->first();

        if (!$status) {
            return response()->json([
                'message' => 'Status not found',
                'data' => null,
            ]);
        }

        return response()->json([
            'message' => 'Status found',
            'data' => $status,
        ]);
    }

    public function store(Request $request, $manga)
    {
        if (!Auth::check()) {
            return response()->json(
                [
                    'code' => 401,
                    'message' =>
                        'Tienes que iniciar sesión para agregar a la biblioteca',
                    'data' => null,
                ],
                401
            );
        }
        $request->validate([
            'manga_title' => 'required',
            'cover_art' => 'required',
            'status' => 'required',
            'recommended' => 'nullable',
            'notes' => 'nullable',
        ]);

        $manga = Manga::firstOrCreate(
            [
                'id' => $manga,
            ],
            [
                'title' => $request->manga_title,
                'cover_url' => $request->cover_art,
            ]
        );

        $status = UserMangaStatus::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'manga_id' => $manga->id,
            ],
            [
                'status' => $request->status,
                'recommended' => $request->recommended,
                'notes' => $request->notes,
            ]
        );

        return response()->json([
            'code' => 200,
            'message' => 'Entrada de biblioteca agregada',
            'data' => $status,
        ]);
    }

    public function delete(UserMangaStatus $status)
    {
        $status->delete();

        return response()->json([
            'code' => 200,
            'message' => 'Entrada de biblioteca eliminada',
        ]);
    }
}
