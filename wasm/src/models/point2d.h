#ifndef __POINT2D_H_INCLUDED__
#define __POINT2D_H_INCLUDED__

#include <cmath>

struct Point2d
{
  float x = 0;
  float y = 0;

  Point2d(float x, float y) : x(x), y(y) {}
  Point2d() : x(0), y(0) {}

  Point2d& operator *(const double& value)
  {
      x = value * x;
      y = value * y;
      return *this;
  }

  Point2d& operator +(const Point2d& point)
  {
      x = x + point.x;
      y = y + point.y;
      return *this;
  }

  bool operator >=(const Point2d& point)
  {
      return x >= point.x && y >= point.y;
  }

  bool operator <=(const Point2d& point)
  {
      return x <= point.x && y <= point.y;
  }
};

#endif
