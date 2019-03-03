#include "kd_node.h"

KDNode* KDNode::build(std::vector<Triangle*> &tris, int depth){
  KDNode* node = new KDNode();
  //node->triangles = tris;
  node->left = NULL;
  node->right = NULL;
  node->bbox = BoundingBox2d();

  if(tris.size() == 0)
    return node;

  if(tris.size() == 1){
    node->bbox = tris[0]->get_bounding_box();
    node->left = new KDNode();
    node->right = new KDNode();
    node->left->triangles = std::vector<Triangle*>();
    node->right->triangles = std::vector<Triangle*>();

    return node;
  }

  node->bbox = tris[0]->get_bounding_box();
  Point2d midpoint;

  int tris_size = tris.size();
  for(auto const& tri: tris) {
    node->bbox.expand( tri->get_bounding_box() );
    midpoint = midpoint + (tri->get_xy_midpoint() * (1.0 / tris_size));
  }

  //std::cout << node->bbox.top.x << ' ' << node->bbox.top.y << ':' << node->bbox.bottom.x << ',' << node->bbox.bottom.y << '\n';
  //std::cout << midpoint.x << ' ' << midpoint.y << '\n';

  std::vector<Triangle*> right_tris;
  std::vector<Triangle*> left_tris;
  int axis = depth % 2;

  for(auto const& tri: tris) {
    switch(axis){
      case 0:
        midpoint.x >= tri->get_xy_midpoint().x ? right_tris.push_back(tri) : left_tris.push_back(tri);
        break;
      case 1:
        midpoint.y >= tri->get_xy_midpoint().y ? right_tris.push_back(tri) : left_tris.push_back(tri);
        break;
    }
  }

  //std::cout << "Right size : " << right_tris.size() << ", Left size : " << left_tris.size() << ", depth : " << depth << '\n';

  if(right_tris.size() > 2 && left_tris.size() > 2) {
    node->left = build(left_tris, depth + 1);
    node->right = build(right_tris, depth + 1);
  } else {
    node->triangles = tris;
    //std::cout << "Stopped subdividing at depth " << depth << '\n';
  }

  return node;
}


float KDNode::hit(Point2d ray_point){
  float z_hit = 0;
  
  if( bbox.hit(ray_point) ) {
    if(left && right) {
      z_hit = std::max(
        left->hit(ray_point),
        right->hit(ray_point)
      );
    } else {
      for(auto const& tri: triangles) {
        z_hit = std::max(
          z_hit,
          tri->hit(ray_point)
        );
      }
    } 
  } else {
    //std::cout << "miss " << depth << '\n';
  }

  return z_hit;
}
