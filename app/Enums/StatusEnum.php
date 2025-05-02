<?php

namespace App\Enums;

enum StatusEnum: string
{
    case CURRENT = 'current';
    case WANT_TO_READ = 'want to read';
    case COMPLETED = 'completed';
    case ON_HOLD = 'on hold';
    case DROPPED = 'dropped';
    case RE_READING = 're-reading';
}
