#ifndef __OCTTREE_NODE_H_INCLUDED__
#define __OCTTREE_NODE_H_INCLUDED__

#define MAX_DEPTH 6


class OctreeNode;

#include "point3d.h"
#include "tool_volume.h"

#include <vector>

class OctreeNode {
private:
  OctreeNode* parent = nullptr;
  OctreeNode* children[8] = { nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr };
  Point3d center;
  
  double scale;
  Point3d vertex[8];
  double f[8] = {1, 1, 1, 1, 1, 1, 1, 1};

public:
  static const Point3d direction[8];
  static OctreeNode* create(float size);

  BoundingBox3d bb;
  unsigned int depth = 0;
  bool has_children = false;
  bool should_remove = false;

  OctreeNode(Point3d center, double scale, unsigned int depth) :
    center(center), scale(scale), depth(depth)
  {
    for(int i=0; i < 8; i++){
      vertex[i] = Point3d(center + (direction[i] * scale));
    }

    bb = bb(vertex[2], vertex[4]);
  };
  
  ~QuadTreeNode() {
    removeChildren();
  }

  Point3d getVertex(int idx);
  void doToolCollision(ToolVolume* tool);
  void createChildren();
  void removeChildren();
};

#endif
