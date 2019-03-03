#include "point_2d.h"

bool operator==(const Point_2d& lhs, const Point_2d& rhs)
{
    return lhs.x == rhs.x && lhs.y == rhs.y;
}

bool operator<(const Point_2d& l, const Point_2d& r) {
     return (l.x<r.x || (l.x==r.x && l.y<r.y));
}
