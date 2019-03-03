#include "path_router.h"

using namespace emscripten;

float PathRouter::distance(const Point_2d *point1, const Point_2d *point2) {
  float dx = point1->x - point2->x;
  float dy = point1->y - point2->y;

  return std::sqrt(dx*dx + dy*dy);
}

float PathRouter::get_rank(const LineSegment *segment) {
  /*
    let rankArray = [
      distance(this.startPosition, path.start),
      distance(this.startPosition, path.end),
      distance(this.endPosition, path.start),
      distance(this.endPosition, path.end)      
    ];
 */
  /*
  std::cout << "####\n";
  std::cout << distance(&segment->start, &start_point) << "\n";
  std::cout << distance(&segment->start, &end_point) << "\n";
  std::cout << distance(&segment->end, &start_point) << "\n";
  std::cout << distance(&segment->end, &end_point) << "\n\n";
  */
  return std::min(
    std::min( distance(&segment->start, &start_point), distance(&segment->start, &end_point)),
    std::min( distance(&segment->end, &start_point), distance(&segment->end, &end_point))
  );
}

float PathRouter::get_map_height(int x, int y) {
  return tool_map->get_height(x, y);
}


std::vector<LineSegment> PathRouter::routePath(std::vector<LineSegment> paths, float x_height_limit){
  std::vector<PathToRoute> pending_paths;

  for(auto & path : paths) {
    PathToRoute new_path;
    new_path.path = &path;
    pending_paths.push_back(new_path);
  }

  pending_paths[0].isRouted = true;
  start_point = pending_paths[0].path->start;
  end_point = pending_paths[0].path->end;

  for(int i = pending_paths.size(); i > 1; i--){
    float best_rank = 9999999;
    PathToRoute *best_path;
    int unclosed_paths = 0;

    for(auto & pending_path : pending_paths) {
      if(!pending_path.isRouted) {
        unclosed_paths++;
        float this_rank =  get_rank(pending_path.path);

        if(this_rank < best_rank ){
          best_path = &pending_path;

          best_rank = this_rank;
        }
      }
    }

    best_path->isRouted = true;
/*
    std::cout << "\n### best path \n"; 
    std::cout << "start " << best_path->path->start.x << " :: " << best_path->path->start.y << '\n';
    std::cout << "end " << best_path->path->end.x << " :: " << best_path->path->end.y << '\n';
    std::cout << "append direction " << get_append_direction(best_path->path) << '\n';
    std::cout << "\n";
*/
    switch(get_append_direction(best_path->path)) {
      case start_reverse:
        best_path->path->reverse();
      case start:
        append_path_to_start(*best_path->path);
        break;
      case end_reverse:
        best_path->path->reverse();
      case end:
        append_path_to_end(*best_path->path);
        break;
    }
  }
  return routed_paths;
}

void PathRouter::append_path_to_end(LineSegment path){
  routed_paths.push_back(path);
  end_point = path.end;
}

void PathRouter::append_path_to_start(LineSegment path){
  std::reverse(routed_paths.begin(), routed_paths.end());
  routed_paths.push_back(path);
  std::reverse(routed_paths.begin(), routed_paths.end());

  start_point = path.start;
}

append_direction PathRouter::get_append_direction(const LineSegment *segment) {
  float rank_array[] = {
    distance(&segment->start, &end_point),
    distance(&segment->end, &end_point),
    distance(&segment->end, &start_point),
    distance(&segment->start, &start_point)
  };

  int best_rank_index = 0;

  for(int i = 0; i < 4; i++){
    if(rank_array[i] < rank_array[best_rank_index])
      best_rank_index = i;
  }

  switch(best_rank_index) {
    case 0:
      return append_direction::end;
    case 1:
      return append_direction::end_reverse;
    case 2:
      return append_direction::start;
    case 3:
      return append_direction::start_reverse;
  };
  return append_direction::end;
}
