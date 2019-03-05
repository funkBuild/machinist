#include "octree_node.h"

#include <iostream>
#include <stdlib.h>

const Point3d OctreeNode::direction[8] = {
  Point3d( 1, 1,-1),   // 0
  Point3d(-1, 1,-1),   // 1
  Point3d(-1,-1,-1),   // 2
  Point3d( 1,-1,-1),   // 3
  Point3d( 1, 1, 1),   // 4
  Point3d(-1, 1, 1),   // 5
  Point3d(-1,-1, 1),   // 6
  Point3d( 1,-1, 1)    // 7
};

OctreeNode* OctreeNode::build(float size){
  double scale = size / 2;
  Point3d center(scale, scale, scale);

  return new OctreeNode(center, scale, 0);
}

void OctreeNode::doToolCollision(ToolVolume* tool){
  // Check if bounding box overlaps with tool bounding box, return if no intersection

  should_remove = true;

  if(!has_children)
    createChildren();

  for(int i=0; i < 8; i++){
    if(f[i] == -1) continue;

    bool is_cut = tool->intersect(vertex[i]);

    if(is_cut)
      f[i] = -1;
    else
      should_remove = false;

    if(children[i]){
      children[i]->doToolCollision(tool);

      if(children[i]->should_remove)
        delete children[i];
    }
  }
}

void OctreeNode::createChildren(){
  if(has_children) return;

  for(int i=0; i < 8; i++){
    children[i] = new OctreeNode(
      (center + (direction[i] * 0.5 * scale)),
      0.5 * scale,
      depth + 1
    );
  }

  has_children = true;
}

void OctreeNode::removeChildren(){
  for(int i=0; i < 8; i++){
    delete children[i];
  };
}
