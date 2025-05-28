<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Manga;
use App\Models\Library;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LibraryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user, Request $request)
    {
        $status = $request->query('status');
        $defaultStatus = [
            'current' => 0,
            'want to read' => 0,
            'completed' => 0,
            'on hold' => 0,
            'dropped' => 0,
            're-reading' => 0,
        ];

        $statusCounts = $user
            ->libraries()
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        $statusCounts = array_replace($defaultStatus, $statusCounts);

        return Inertia::render('Library/Index', [
            'owner' => $user->only('id', 'name'),
            'data' => $user
                ->libraries()
                ->with('manga')
                ->when($status, fn($query) => $query->where('status', $status))
                ->orderBy('updated_at', 'desc')
                ->get(),
            'filters' => request()->only([
                'search',
                'status',
                'sort',
                'direction',
            ]),
            'statusCounts' => $statusCounts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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
                'slug' => Str::slug($request->manga_title),
            ]
        );

        $status = Library::updateOrCreate(
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

    /**
     * Display the specified resource.
     */
    public function show($manga)
    {
        $status = Library::where([
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Library $library)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Library $library)
    {
        if (!Auth::check()) {
            return response()->json(
                [
                    'code' => 401,
                    'message' =>
                        'Tienes que iniciar sesión para actualizar la biblioteca',
                    'data' => null,
                ],
                401
            );
        }

        if ($library->user_id !== Auth::id()) {
            return response()->json(
                [
                    'code' => 401,
                    'message' =>
                        'No tienes permiso para actualizar esta entrada de biblioteca',
                    'data' => null,
                ],
                401
            );
        }

        $request->validate([
            'status' => 'required',
            'recommended' => 'nullable',
            'notes' => 'nullable',
        ]);
        $library->update($request->all());

        return response()->json([
            'code' => 200,
            'message' => 'Entrada de biblioteca actualizada',
            'data' => $library->load('manga'),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Library $library)
    {
        $library->delete();

        return response()->json([
            'code' => 200,
            'message' => 'Entrada de biblioteca eliminada',
        ]);
    }
}
