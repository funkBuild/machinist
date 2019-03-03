#ifndef __POINT3D_H_INCLUDED__
#define __POINT3D_H_INCLUDED__

#include <cmath>

struct Point3d
{
  float x = 0;
  float y = 0;
  float z = 0;

  Point3d(float x, float y, float z) : x(x), y(y), z(z) {}
  Point3d() : x(0), y(0), z(0) {}

  Point3d operator -(const Point3d& point)
  {
      Point3d result;
      result.x = x - point.x;
      result.y = y - point.y;
      result.z = z - point.z;
      return result;
  }

  Point3d operator +(const Point3d& point)
  {
      Point3d result;
      result.x = x + point.x;
      result.y = y + point.y;
      result.z = z + point.z;
      return result;
  }

  Point3d operator *(const float value)
  {
      Point3d result;
      result.x = x * value;
      result.y = y * value;
      result.z = z * value;
      return result;
  }

  Point3d cross_product(const Point3d& p) {
    Point3d cp;
    cp.x = y * p.z - z * p.y;
    cp.y = z * p.x - x * p.z;
    cp.z = x * p.y - y * p.x;

    return cp;
  }

  float dot_product(const Point3d& p) {
    return x * p.x + y * p.y + z * p.z;
  }
};

#endif
