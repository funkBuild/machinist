#ifndef __POINT_2D_H_INCLUDED__
#define __POINT_2D_H_INCLUDED__

struct Point_2d
{
  signed int x = 0;
  signed int y = 0;
};

bool operator==(const Point_2d& lhs, const Point_2d& rhs);
bool operator<(const Point_2d& l, const Point_2d& r);

#endif
