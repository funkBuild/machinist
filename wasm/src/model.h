#ifndef __MODEL_H_INCLUDED__
#define __MODEL_H_INCLUDED__

class Model;

#include <emscripten/bind.h>
#include <iostream>
#include <cmath>
#include <vector>
#include <iterator>
#include <map>

#include "models/kd_node.h"
#include "models/triangle.h"


class Model {
private:
  float* triangles_arr;
  uintptr_t triangles_ptr;

  std::vector<Triangle> triangles;
  KDNode* kd_tree_root;

  void processTriangles();
  void createKDTree();
public:
  int num_triangles;
  BoundingBox2d bounding_box;

  Model(uintptr_t triangles_ptr, int num_triangles)
    : triangles_arr( reinterpret_cast<float*>(triangles_ptr) )
    , num_triangles( num_triangles )
  {
    processTriangles();
    createKDTree();
  }

  ~Model() {
    delete kd_tree_root;
  }

  float hit(Point2d &test_point);
};

#endif
