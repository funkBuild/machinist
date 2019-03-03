#ifndef __POINT_3D_H_INCLUDED__
#define __POINT_3D_H_INCLUDED__

#include <cmath>

struct Point_3d
{
  int x = 0;
  int y = 0;
  float z = 0;

  void normalize() {
    float magnitude = std::sqrt(x*x + y*y + z*z);
    x = x / magnitude;
    y = y / magnitude;
    z = z / magnitude;
  }
};

#endif
