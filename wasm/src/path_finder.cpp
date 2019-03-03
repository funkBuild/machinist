#include "path_finder.h"

using namespace emscripten;

bool compareByValue(const Node *elem1, const Node *elem2 )
{
    return elem1->fScore > elem2->fScore;
}

float PathFinder::get_map_height(int x, int y) {
  return std::max(
    tool_map->get_height(x, y),
    z_height_min
  );
}

bool PathFinder::is_reachable(int x, int y) {
  return x >= 0
    && y >= 0
    && x < map_x_size
    && y < map_y_size;
}

float PathFinder::estimate_cost(Node *node) {
  const int D = 1;

  float currentZHeight = get_map_height(node->position.x, node->position.y);
  float goalZHeight = get_map_height(end_point.x, end_point.y);

  float dx = std::abs(node->position.x - end_point.x) / x_speed;
  float dy = std::abs(node->position.y - end_point.y) / y_speed;
  float dz = std::abs(currentZHeight - goalZHeight) / z_speed;

  return std::sqrt(dx*dx + dy*dy + dz*dz);
}

std::vector<LineSegment> PathFinder::get_return_path(Node *node) {
  std::vector<LineSegment> return_path;
  std::vector<Point_2d> return_points;

  do {
    Point_2d next_point = node->position;
    return_points.push_back(next_point);
  } while((node = node->parent_node));

  std::reverse(return_points.begin(), return_points.end());

  for(int i=0; i < return_points.size()-1; i++){
    LineSegment this_segment;
    this_segment.start = return_points[i];
    this_segment.end = return_points[i+1];
    this_segment.z_height.push_back(
      get_map_height( return_points[i].x, return_points[i].y)
    );
    this_segment.z_height.push_back(
      get_map_height( return_points[i+1].x, return_points[i+1].y)
    );

    return_path.push_back(this_segment);
  }

  return return_path;
}

void PathFinder::setZHeightMinimum(float _z_height_min) {
  z_height_min = _z_height_min;
  return;
}

void PathFinder::setStartPoint(int _x, int _y) {
  start_point.x = _x;
  start_point.y = _y;
  return;
}

void PathFinder::setEndPoint(int _x, int _y) {
  end_point.x = _x;
  end_point.y = _y;
  return;
}

std::vector<LineSegment> PathFinder::route() {
  nodes.clear();
  open_nodes.clear();

  nodes[start_point.x][start_point.y] = Node();

  Node *start_node = &nodes[start_point.x][start_point.y];
  start_node->fScore = 0;
  start_node->gScore = 0;
  start_node->position.x = start_point.x;
  start_node->position.y = start_point.y;

  open_nodes.push_back( start_node );  

  while(open_nodes.size() > 0) {
    std::sort(open_nodes.begin(),open_nodes.end(),compareByValue);

    Node *current_node = open_nodes.back();
    open_nodes.pop_back();

    if( current_node->position == end_point ) {
      // All done!
      return get_return_path(current_node);
    }
    current_node->isQueued = false;
    current_node->isClosed = true;

    const int neib_indexes[] = { 1,0, -1,0, 0,1, 0,-1 };

    for(short i=0; i < 8; i += 2) {
      Node *this_node;
      int next_x_position = current_node->position.x + neib_indexes[i];
      int next_y_position = current_node->position.y + neib_indexes[i + 1];

      // check next position isn't out of bounds
      if(!is_reachable(next_x_position, next_y_position)) continue;

      if( nodes.find(next_x_position) == nodes.end() ||
          nodes[next_x_position].find(next_y_position) == nodes[next_x_position].end()) {
        // Node doesn't exist, make a new one
        nodes[next_x_position][next_y_position] = Node();
        this_node = &nodes[next_x_position][next_y_position];
        this_node->position.x = next_x_position;
        this_node->position.y = next_y_position;
        this_node->gScore = 9999999999;
      } else {
        // Fetch the existing node
        this_node = &nodes[next_x_position][next_y_position];

        if(this_node->isClosed) {
          continue;
        }
      }
      
      if(!this_node->isQueued) {
        this_node->isQueued = true;
        open_nodes.push_back( this_node );
      }

      float current_gScore = current_node->gScore + 1;
      if(current_gScore >= this_node->gScore) continue;

      this_node->parent_node = current_node;

      this_node->gScore = current_gScore;
      this_node->fScore = estimate_cost(this_node);
    }
  }
  
  // TODO fix this sloppiness
  std::vector<LineSegment> blank_return_val;
  return blank_return_val;
}

