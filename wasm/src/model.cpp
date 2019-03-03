#include "model.h"

using namespace emscripten;

void Model::processTriangles(){
  int offset = 0;

  for(int i=0; i < num_triangles; i++){
    Triangle new_triangle;

    new_triangle.p0.x = triangles_arr[offset++];
    new_triangle.p0.y = triangles_arr[offset++];
    new_triangle.p0.z = triangles_arr[offset++];

    new_triangle.p1.x = triangles_arr[offset++];
    new_triangle.p1.y = triangles_arr[offset++];
    new_triangle.p1.z = triangles_arr[offset++];

    new_triangle.p2.x = triangles_arr[offset++];
    new_triangle.p2.y = triangles_arr[offset++];
    new_triangle.p2.z = triangles_arr[offset++];

    bounding_box.expand( new_triangle.get_bounding_box() );
    triangles.push_back(new_triangle);
  }

  Point3d offset_point;
  offset_point.x = -1 * bounding_box.bottom.x;
  offset_point.y = -1 * bounding_box.bottom.y;
  offset_point.z = 0;

  for(int i=0; i<triangles.size(); i++) {
    triangles[i].offset(offset_point);
  }

  // Update bounding box
  bounding_box.offset(offset_point);

  delete triangles_arr;
}

void Model::createKDTree(){
  std::vector<Triangle*> triangle_ptrs;

  for(int i=0; i<triangles.size(); i++) {
    triangle_ptrs.push_back(&triangles[i]);
  }

  kd_tree_root = KDNode::build(triangle_ptrs, 0);
}

float Model::hit(Point2d &test_point){
  return kd_tree_root->hit( test_point );
}
