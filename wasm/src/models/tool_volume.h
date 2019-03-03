#ifndef __TOOL_VOLUME_H_INCLUDED__
#define __TOOL_VOLUME_H_INCLUDED__


#include "Point3d.h"
#include "bounding_box_3d.h"

#include <iostream>
#include <math.h>

class ToolVolume {
private:
  float radius, length;
  Point3d position;

public:
  BoundingBox3d bb;

  ToolVolume(float radius, float length)
    : radius( radius ), length( length )
  {
    bb = BoundingBox3d(
      Point3d(position.x - radius, position.y - radius, position.z),
      Point3d(position.x + radius, position.y + radius, position.z + length),
    );
  }

  ~ToolVolume() {}

  void setPosition(Point3d new_position){
    position = new_position;
  }

  bool intersect(Point3d vertex){
    if(vertex.z < location.z)
      return false;

    float d = sqrt( pow(location.x - vertex.x, 2) + pow(location.y - vertex.y, 2) );
    return d <= radius;
  }
};

#endif
