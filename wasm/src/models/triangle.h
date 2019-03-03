#ifndef __TRIANGLE_H_INCLUDED__
#define __TRIANGLE_H_INCLUDED__

#include <algorithm>
#include <iostream>

#include "point3d.h"
#include "point2d.h"
#include "bounding_box_2d.h"

struct Triangle
{
  Point3d p0;
  Point3d p1;
  Point3d p2;

  BoundingBox2d get_bounding_box() {
    BoundingBox2d bbox;

    bbox.top.x = std::max(p0.x, std::max(p1.x, p2.x));
    bbox.top.y = std::max(p0.y, std::max(p1.y, p2.y));
    bbox.bottom.x = std::min(p0.x, std::min(p1.x, p2.x));
    bbox.bottom.y = std::min(p0.y, std::min(p1.y, p2.y));

    return bbox;
  }

  void offset(Point3d offset){
    p0.x += offset.x;
    p0.y += offset.y;
    p0.z += offset.z;

    p1.x += offset.x;
    p1.y += offset.y;
    p1.z += offset.z;

    p2.x += offset.x;
    p2.y += offset.y;
    p2.z += offset.z;
  }

  Point2d get_xy_midpoint() {
    Point2d midpoint;
    midpoint.x = (p0.x + p1.x + p2.x) / 3.0;
    midpoint.y = (p0.y + p1.y + p2.y) / 3.0;

    return midpoint;
  }

  float hit(Point2d rayPoint2d) {
    Point3d rayStart;
    rayStart.x = rayPoint2d.x;
    rayStart.y = rayPoint2d.y;
    rayStart.z = 1000.0;

    Point3d rayEnd;
    rayEnd.x = rayPoint2d.x;
    rayEnd.y = rayPoint2d.y;
    rayEnd.z = 0;

    Point3d rayDir = rayEnd - rayStart;
    
    Point3d u = p1 - p0;
    Point3d v = p2 - p0;

    Point3d n = u.cross_product(v);

    Point3d w0 = rayStart - p0;
    double a = -1 * n.dot_product(w0);
    double b = n.dot_product(rayDir);

    if(b == 0.0f)
    {
      //std::cout << a << "\n";
      //std::cout << "miss 1 " << b << "\n";
      return 0;
    }

    // get intersect point of ray with triangle plane
    double r = a / b;
    if(r < 0) return 0;

    Point3d intersect = rayStart + rayDir * r; // intersect point of ray and plane
    
    //std::cout << rayPoint.x << ", " << rayPoint.y << ", " << rayPoint.z << '\n';
    //std::cout << rayDir.x << ", " << rayDir.y << ", " << rayDir.z << '\n';
    //std::cout << intersect.x << ", " << intersect.y << ", " << intersect.z << '\n';

    // is I inside T?
    double uu, uv, vv, wu, wv, D;
    Point3d w;

    uu = u.dot_product(u);
    uv = u.dot_product(v);
    vv = v.dot_product(v);
    w = intersect - p0;
    wu = w.dot_product(u);
    wv = w.dot_product(v);
    D = uv * uv - uu * vv;

    // get and test parametric coords
    double s, t;
    s = (uv * wv - vv * wu) / D;
    if (s < 0.0f || s > 1.0f)        // I is outside T
    {
      return 0;
    }

    t = (uv * wu - uu * wv) / D;
    if (t < 0.0f || (s + t) > 1.0f)        // I is outside T
    {
      return 0;
    }

    //std::cout << "hit " << intersect.x << '\n';
    return intersect.z;   
  }
};

#endif
