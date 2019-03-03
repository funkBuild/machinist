#include "quadtree_node.h"
#include "point2d.h"
#include <iostream>
#include <stdlib.h>

bool closeEnoughToMerge(float h1, float h2){
  return h1 == h2; //std::abs(h1 - h2) < 0.5;
}

QuadTreeNode* QuadTreeNode::build(float xSize, float ySize, float height){
  Point2d origin(0, 0);
  Point2d top_right(xSize, ySize);
  BoundingBox2d bbox(top_right, origin);

  QuadTreeNode* root = new QuadTreeNode(bbox, height, 0, 0);

  return root;
}

void QuadTreeNode::doToolCollision(std::vector<Point3d>* tool_points){
  // reduce the tool_points to those that only collide with my bounding box
  std::vector<Point3d> hit_tool_points (tool_points->size());

  auto it = std::copy_if (tool_points->begin(), tool_points->end(), hit_tool_points.begin(), [&](Point3d tp){
    return bbox.hit(tp);
  });

  hit_tool_points.resize(std::distance(hit_tool_points.begin(), it));  // shrink container to new size

  // miss check
  if(hit_tool_points.size() == 0){
    return;
  }

  // if at maximum depth, set height to lowest tool_point
  if(depth == MAX_DEPTH){
    for (auto &tp : hit_tool_points){ 
      if(tp.z < height) height = tp.z;
    };
  } else {
    // Create child nodes if they don't exist
    createChildren();

    // for each node, filter the tool_points and pass to doToolCollision
    child_nodes[0]->doToolCollision(&hit_tool_points);
    child_nodes[1]->doToolCollision(&hit_tool_points);
    child_nodes[2]->doToolCollision(&hit_tool_points);
    child_nodes[3]->doToolCollision(&hit_tool_points);

    bool can_remove_children = true;
    for(int i=0; i < 4; i++){
      if(child_nodes[i]->has_children) can_remove_children = false;
    }

    // if all 4 nodes are leafs and the height is the same, delete them and become leaf with same height
    if( can_remove_children
      && closeEnoughToMerge(child_nodes[0]->height, child_nodes[1]->height)
      && closeEnoughToMerge(child_nodes[2]->height, child_nodes[3]->height)
      && closeEnoughToMerge(child_nodes[1]->height, child_nodes[2]->height)){

      height = child_nodes[0]->height;
      removeChildren();
    } /* else {
      height = (child_nodes[0]->height + child_nodes[1]->height + child_nodes[2]->height + child_nodes[3]->height) / 4;
    } */

    // TODO: return removedVolume if any
  }                  

  return;
}

void QuadTreeNode::createChildren(){
  if(has_children)
    return;
  else
    has_children = true;

  unsigned int next_depth = depth + 1;
  unsigned int id_offset = 4*id;

  child_nodes[0] = new QuadTreeNode(bbox.topLeft(), height, next_depth, ++id_offset);
  child_nodes[1] = new QuadTreeNode(bbox.topRight(), height, next_depth, ++id_offset);
  child_nodes[2] = new QuadTreeNode(bbox.bottomRight(), height, next_depth, ++id_offset);
  child_nodes[3] = new QuadTreeNode(bbox.bottomLeft(), height, next_depth, ++id_offset);
}

void QuadTreeNode::removeChildren(){
  if(!has_children) return;

  height = (child_nodes[0]->height + child_nodes[1]->height + child_nodes[2]->height + child_nodes[3]->height) / 4;

  for(int i=0; i < 4; i++){
    delete child_nodes[i];
    child_nodes[i] = nullptr;
  }

  has_children = false;
}

void QuadTreeNode::toPolygons(SimPolygonStore* store, PolygonStore* polygon_store){
  PolygonStore* this_store = polygon_store;

  // TODO 
  //if(depth == 5)
  //  this_store = store->getStore(id);

  if(has_children){
    child_nodes[0]->toPolygons(store, this_store);
    child_nodes[1]->toPolygons(store, this_store);
    child_nodes[2]->toPolygons(store, this_store);
    child_nodes[3]->toPolygons(store, this_store);

    return;
  }


  //unsigned int indexStart = polygon_store->vertices.size() / 3;

  std::vector<float>* vertices = &this_store->vertices;

/*

  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 1
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 2
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 4
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 5
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 6
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 7
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  std::vector<unsigned short int>* indices = &polygon_store->indices[0];
*/

  // Top 1
  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 2
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  // Top 2
  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 1
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);



  // Bottom 1
  vertices->push_back(bbox.bottom.x); // 6
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 4
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 7
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  // Bottom 2
  vertices->push_back(bbox.top.x); // 4
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 5
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 7
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);


  // Sides
  vertices->push_back(bbox.bottom.x); // 7
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 6
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 5
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 7
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 4
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 5
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 6
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 4
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 6
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 2
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 2
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.bottom.x); // 6
  vertices->push_back(bbox.top.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 0
  vertices->push_back(bbox.top.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 1
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 5
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.bottom.x); // 3
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);

  vertices->push_back(bbox.top.x); // 5
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(0);

  vertices->push_back(bbox.top.x); // 1
  vertices->push_back(bbox.bottom.y);
  vertices->push_back(height);


/*

  // Top 1
  indices->push_back(indexStart);
  indices->push_back(indexStart + 2);
  indices->push_back(indexStart + 3);

  // Top 2
  indices->push_back(indexStart + 3);
  indices->push_back(indexStart + 1);
  indices->push_back(indexStart);



  // Bottom 1
  indices = &polygon_store->indices[1];

  indices->push_back(indexStart + 6);
  indices->push_back(indexStart + 4);
  indices->push_back(indexStart + 7);

  // Bottom 2
  indices->push_back(indexStart + 4);
  indices->push_back(indexStart + 5);
  indices->push_back(indexStart + 7);


  // Sides
  indices = &polygon_store->indices[2];
  indices->push_back(indexStart + 7);
  indices->push_back(indexStart + 3);
  indices->push_back(indexStart + 6);

  indices->push_back(indexStart + 5);
  indices->push_back(indexStart + 3);
  indices->push_back(indexStart + 7);

  indices = &polygon_store->indices[3];

  indices->push_back(indexStart + 4);
  indices->push_back(indexStart);
  indices->push_back(indexStart + 5);

  indices->push_back(indexStart + 6);
  indices->push_back(indexStart);
  indices->push_back(indexStart + 4);

  indices = &polygon_store->indices[4];

  indices->push_back(indexStart);
  indices->push_back(indexStart + 6);
  indices->push_back(indexStart + 2);

  indices->push_back(indexStart + 2);
  indices->push_back(indexStart + 6);
  indices->push_back(indexStart + 3);

  indices = &polygon_store->indices[5];

  indices->push_back(indexStart);
  indices->push_back(indexStart + 1);
  indices->push_back(indexStart + 5);

  indices->push_back(indexStart + 3);
  indices->push_back(indexStart + 5);
  indices->push_back(indexStart + 1);

*/
}
