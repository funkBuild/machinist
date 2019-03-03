#include "path_optimizer.h"

std::vector<Path_3d> PathOptimizer::optimize_path(std::vector<LineSegment> unoptimized_paths){
  PathOptimizer optimizer(unoptimized_paths);
  return optimizer.optimize();
}


std::vector<Path_3d> PathOptimizer::optimize(){
  Path_3d current_path = paths[0];

  Point_3d current_direction;
  current_direction.x = (current_path.end.x - current_path.start.x);
  current_direction.y = (current_path.end.y - current_path.start.y);
  current_direction.z = (current_path.end.z - current_path.start.z);
  current_direction.normalize();

  for(int i=1; i < paths.size(); i++){
    Path_3d next_path = paths[i];

    Point_3d next_direction;
    next_direction.x = (next_path.end.x - next_path.start.x);
    next_direction.y = (next_path.end.y - next_path.start.y);
    next_direction.z = (next_path.end.z - next_path.start.z);
    next_direction.normalize();

    if( current_direction.x == next_direction.x
          && current_direction.y == next_direction.y
          && current_direction.z == next_direction.z ) {
      current_path.end = next_path.end;
    } else {
      optimized_paths.push_back(current_path);
      current_path = next_path;
      current_direction = next_direction;
    }
  }

  optimized_paths.push_back(current_path);
/*
  for(auto const& current_path: optimized_paths) {
    std::cout << "Line " << current_path.start.x << ',' << current_path.start.y << ',' << current_path.start.z;
    std::cout << " :: " << current_path.end.x << ',' << current_path.end.y << ',' << current_path.end.z << "\n";
  };
  std::cout << "####" << '\n';
*/
  return optimized_paths;
}

void PathOptimizer::deconstruct_on_z(std::vector<LineSegment> unoptimized_paths){
  for(auto const& path: unoptimized_paths) {
    Point_3d current_point;
    current_point.x = path.start.x;
    current_point.y = path.start.y;
    current_point.z = path.z_height[0];

    Point_3d next_point;
    next_point.x = current_point.x;
    next_point.y = current_point.y;
    next_point.z = path.z_height[1];

    Point_2d current_direction;
    current_direction.x = (path.end.x - path.start.x) / (int)(path.z_height.size() - 1);
    current_direction.y = (path.end.y - path.start.y) / (int)(path.z_height.size() - 1);

    next_point.x += current_direction.x;
    next_point.y += current_direction.y;

    Path_3d current_path;
    current_path.line_type = path.line_type;
    current_path.start = current_point;
    current_path.end = next_point;

    float current_z_velocity = next_point.z - current_point.z;

    current_point = next_point;

    for(int i = 2; i < path.z_height.size(); i++) {
      next_point.x = current_point.x;
      next_point.y = current_point.y;
      next_point.z = path.z_height[i];

      next_point.x += current_direction.x;
      next_point.y += current_direction.y;

      float next_z_velocity = next_point.z - current_point.z;

      if(next_z_velocity == current_z_velocity) {
        // extend the path
        current_path.end = next_point;
      } else {
        // Push the path and create a new one
        paths.push_back(current_path);
        current_path.start = current_point;
        current_path.end = next_point;
      }

      current_z_velocity = next_z_velocity;
      current_point = next_point;
    }

    paths.push_back(current_path);
  }
/*
  for(auto const& current_path: paths) {
    std::cout << "Line " << current_path.start.x << ',' << current_path.start.y << ',' << current_path.start.z;
    std::cout << " :: " << current_path.end.x << ',' << current_path.end.y << ',' << current_path.end.z << "\n";
  };
  std::cout << "####" << '\n';
*/
  return;
}
