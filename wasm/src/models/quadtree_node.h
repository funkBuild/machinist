#ifndef __QUADTREE_NODE_H_INCLUDED__
#define __QUADTREE_NODE_H_INCLUDED__

#define MAX_DEPTH 6


class QuadTreeNode;

#include "bounding_box_2d.h"
#include "point2d.h"
#include "../sim_polygon_store.h"
#include <vector>

class QuadTreeNode {
private:
  QuadTreeNode* child_nodes[4] = { nullptr, nullptr, nullptr, nullptr };

public:
  float height;
  unsigned int depth = 0, id = 0;
  bool has_children = false;
  BoundingBox2d bbox;

  static QuadTreeNode* build(float xSize, float ySize, float height);

  QuadTreeNode(BoundingBox2d bbox, float height, unsigned int depth, unsigned int id) :
    bbox(bbox), height(height), depth(depth), id(id)
  {};
  
  ~QuadTreeNode() {
    removeChildren();
  }

  void doToolCollision(std::vector<Point3d>* tool_points);
  void createChildren();
  void removeChildren();
  void toPolygons(SimPolygonStore* store, PolygonStore* polygons);
};

#endif
