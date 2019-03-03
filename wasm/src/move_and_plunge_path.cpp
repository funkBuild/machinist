#include "move_and_plunge_path.h"

using namespace emscripten;

float MoveAndPlungePath::get_map_height(int x, int y) {
  return tool_map->get_height(x, y);
}

std::vector<LineSegment> MoveAndPlungePath::createPath(LineSegment start, LineSegment end){
  PathFinder path_finder(tool_map);
  
  path_finder.setZHeightMinimum( start.z_height.back() );
  
  //std::cout << "MoveAndPlungePath from " << start.end.x << ',' << start.end.y << " to " << end.start.x << ',' << end.start.y << '\n';
  //std::cout << "zHeight start = " << start.z_height.back()<< '\n';
  //std::cout << "zHeight end = " << end.z_height[0] << '\n';

  path_finder.setStartPoint(start.end.x, start.end.y);
  path_finder.setEndPoint(end.start.x, end.start.y);
  std::cout << "Routing path\n";
  std::vector<LineSegment> movement_path = path_finder.route();
  
  std::cout << "Finished routing path\n";


  /*
    std::cout << "Line " << value.start.x << ' ' << value.start.y << " :: " << value.end.x << ' ' << value.end.y << '\n';
    for(auto const& z_h: value.z_height) {
      std::cout << z_h << ", ";
    }
    std::cout << '\n';
  };
  std::cout << "####" << '\n';
  */

  LineSegment end_segment = movement_path.back();
  LineSegment plunge_path;

  plunge_path.start = end.start;
  plunge_path.end = end.start;
  plunge_path.z_height.push_back( end_segment.z_height.back() );
  plunge_path.z_height.push_back( end.z_height[0] );

  movement_path.push_back(plunge_path);

  for(auto& path: movement_path) {
    path.line_type = LineType::RAPID;
  };
  
  return movement_path;
};
