#ifndef __2D_BOUNDING_BOX_H_INCLUDED__
#define __2D_BOUNDING_BOX_H_INCLUDED__

#include "point2d.h"
#include "point3d.h"
#include <algorithm>
#include <iostream>

struct BoundingBox2d
{
  Point2d top;
  Point2d bottom;

  BoundingBox2d() {}
  BoundingBox2d(Point2d top, Point2d bottom) : top(top), bottom(bottom) {}
  BoundingBox2d(float topX, float topY, float bottomX, float bottomY) :
    top( Point2d(topX, topY) ), bottom( Point2d(bottomX, bottomY) ) {}

  void expand(BoundingBox2d bbox){
    top.x = std::max(bbox.top.x, top.x);
    top.y = std::max(bbox.top.y, top.y);
    bottom.x = std::min(bbox.bottom.x, bottom.x);
    bottom.y = std::min(bbox.bottom.y, bottom.y);
  }

  void offset(Point3d offset) {
    top.x += offset.x;
    top.y += offset.y;
    bottom.x += offset.x;
    bottom.y += offset.y;
  }

  bool hit(Point2d position) {
    //std::cout << "Pos X " << position.x << " Pos y " << position.y << "\n";
    //std::cout << "Bottom X " << bottom.x << " bottom y " << bottom.y << "\n";
    //std::cout << "top X " << top.x << " top y " << top.y << "\n";
    return position <= top && position >= bottom;
  }

  bool hit(Point3d p) {
    Point2d position(p.x, p.y);

    return hit(position);
  }

  Point2d center(){
    return Point2d(
      (top.x - bottom.x) / 2 + bottom.x,
      (top.y - bottom.y) / 2 + bottom.y
    );
  }

  BoundingBox2d topLeft(){
    Point2d this_center = center();

    return BoundingBox2d(
      this_center.x, top.y,
      bottom.x, this_center.y
    );
  }

  BoundingBox2d topRight(){
    return BoundingBox2d(
      top,
      center()
    );
  }

  BoundingBox2d bottomLeft(){
    return BoundingBox2d(
      center(),
      bottom
    );
  }

  BoundingBox2d bottomRight(){
    Point2d this_center = center();

    return BoundingBox2d(
      top.x, this_center.y,
      this_center.x, bottom.y
    );
  }
};

#endif
