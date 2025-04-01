<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function ReviewsByManga(Manga $manga, Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $offset = ($page - 1) * $limit;

        $reviews = $manga
            ->reviews()
            ->with('user')
            ->offset($offset)
            ->limit($limit)
            ->get();

        $total = $manga->reviews()->count();
        $hasMore = $offset + $limit < $total;

        return response()->json([
            'data' => $reviews,
            'hasMore' => $hasMore,
            'page' => $page,
            'limit' => $limit,
            'total' => $total,
        ]);
    }
}
