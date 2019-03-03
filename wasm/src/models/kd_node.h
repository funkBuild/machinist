#ifndef __KD_NODE_H_INCLUDED__
#define __KD_NODE_H_INCLUDED__

class KDNode;

#include <iostream>
#include <cmath>
#include <vector>
#include <iterator>
#include <map>
#include <memory>

#include "bounding_box_2d.h"
#include "triangle.h"
#include "point2d.h"

class KDNode {
private:

public:
  BoundingBox2d bbox;
  KDNode* left;
  KDNode* right;
  std::vector<Triangle*> triangles;

  KDNode(){};

  static KDNode* build(std::vector<Triangle*> &tris, int depth);
  float hit(Point2d ray_point);
  
  ~KDNode() {
    delete left;
    delete right;
  }
};

#endif
