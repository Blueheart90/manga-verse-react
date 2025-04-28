<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use App\Models\Review;
use Illuminate\Http\Request;
use Mews\Purifier\Facades\Purifier;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function ReviewsByManga($mangaId, Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 10);
        $offset = ($page - 1) * $limit;

        $manga = Manga::find($mangaId);
        if (!$manga) {
            return response()->json([
                'data' => [],
                'hasMore' => false,
                'page' => (int) $page,
                'limit' => (int) $limit,
                'total' => 0,
            ]);
        }

        $reviews = $manga
            ->reviews()
            ->with('user')
            ->orderBy('created_at', 'desc')
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

    public function store(Request $request, $manga)
    {
        $validatedData = $request->validate([
            'manga_title' => 'required',
            'cover_art' => 'required',
            'user_id' => 'required',
            'title' => 'required',
            'recommended' => 'required',
            'content' => 'required',
            'rating' => 'required',
        ]);

        $manga = Manga::firstOrCreate(
            [
                'id' => $manga,
            ],
            [
                'title' => $validatedData['manga_title'],
                'cover_url' => $validatedData['cover_art'],
            ]
        );

        $validatedData['content'] = Purifier::clean($validatedData['content']);

        $review = $manga->reviews()->create([
            'content' => $validatedData['content'],
            'recommended' => $validatedData['recommended'],
            'user_id' => $validatedData['user_id'],
            'title' => $validatedData['title'],
            'rating' => $validatedData['rating'],
        ]);

        return response()->json([
            'message' => 'Review created successfully',
            'newReview' => $review->load('user'),
        ]);
    }

    public function update(Request $request, Review $review)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'recommended' => 'required',
            'content' => 'required',
            'rating' => 'required',
        ]);

        try {
            $validatedData['content'] = Purifier::clean(
                $validatedData['content']
            );
            $review->update([
                'content' => $validatedData['content'],
                'recommended' => $validatedData['recommended'],
                'title' => $validatedData['title'],
                'rating' => $validatedData['rating'],
            ]);

            return response()->json([
                'code' => 200,
                'message' => 'Review updated successfully',
                'newReview' => $review->load('user'),
            ]);
        } catch (\Exception $e) {
            return response()->json(
                ['code' => $e->getCode(), 'message' => $e->getMessage()],
                $e->getCode()
            );
        }
    }

    public function userReview(Manga $manga)
    {
        $review = $manga
            ->reviews()
            ->where('user_id', auth()->id())
            ->first();

        return response()->json($review);
    }
}
