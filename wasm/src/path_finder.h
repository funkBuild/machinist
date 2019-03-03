#ifndef __PATH_FINDER_H_INCLUDED__
#define __PATH_FINDER_H_INCLUDED__

class PathFinder;

#include <emscripten/bind.h>
#include <cmath>
#include <vector>
#include <map>
#include <algorithm>

#include "point_2d.h"
#include "line_segment.h"
#include "tool_map.h"

struct Node
{
  bool isClosed = false;
  bool isQueued = false;
  float gScore = 0;
  float fScore = 0;
  Point_2d position = Point_2d(); 
  Node *parent_node;
};

bool compareByValue(const Node *elem1, const Node *elem2 );

class PathFinder {
private:
  int map_x_size, map_y_size;
  float z_height_min;
  ToolMap* tool_map;
  Point_2d start_point = Point_2d(), end_point = Point_2d();
  std::map<int,std::map<int,Node>> nodes;
  std::vector<Node*> open_nodes;

  const float x_speed = 100, y_speed = 100, z_speed = 1;

  float get_map_height(int x, int y);
  bool is_reachable(int x, int y);

  float estimate_cost(Node *node);

  std::vector<LineSegment> get_return_path(Node *node);
public:
  PathFinder(ToolMap *tool_map_)
    : tool_map(tool_map_)
  {
    map_x_size = tool_map->get_map_x_size();
    map_y_size = tool_map->get_map_y_size();
  }

  void setZHeightMinimum(float _z_height_min);
  void setStartPoint(int _x, int _y);
  void setEndPoint(int _x, int _y);
  std::vector<LineSegment> route();
};
#endif
