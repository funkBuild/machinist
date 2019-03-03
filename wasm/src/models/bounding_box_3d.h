#ifndef __BOUNDING_BOX_3D_H_INCLUDED__
#define __BOUNDING_BOX_3D_H_INCLUDED__

#include "point3d.h"
#include <algorithm>
#include <cmath>

class BoundingBox3d
{
  Point3d min;
  Point3d max;

  BoundingBox3d() {}
  BoundingBox3d(Point3d min, Point3d max) : min(min), max(max) {}

  bool checkCollision(BoundingBox3d b){
    if( (max.x < b.min.x) || (min.x > b.max.x) )
      return false;
    else if( (max.y < b.min.y) || (min.y > b.max.y) )
      return false;
    else if( (max.z < b.min.z) || (min.z > b.max.z) )
      return false;
    else
      return true;
  } 
};

#endif
