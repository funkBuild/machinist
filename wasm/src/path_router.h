#ifndef __PATH_ROUTER_H_INCLUDED__
#define __PATH_ROUTER_H_INCLUDED__

class PathRouter;

#include <emscripten/bind.h>
#include <cmath>
#include <vector>
#include <map>
#include <iostream>

#include "point_2d.h"
#include "line_segment.h"
#include "tool_map.h"

struct PathToRoute
{
  LineSegment *path;
  bool isRouted = false;
};

enum append_direction
{
  start,
  start_reverse,
  end,
  end_reverse
};

class PathRouter {
private:
  ToolMap* tool_map;
  std::vector<LineSegment> routed_paths;
  int map_x_size, map_y_size;
  float z_height_limit;

  Point_2d start_point, end_point;

  float distance(const Point_2d *point1, const Point_2d *point2);
  float get_rank(const LineSegment *segment);
  float get_map_height(int x, int y);
  append_direction get_append_direction(const LineSegment *segment);
  void append_path_to_start(LineSegment path);
  void append_path_to_end(LineSegment path);

public:
  PathRouter(ToolMap *tool_map_)
    : tool_map(tool_map_)
  {
    map_x_size = tool_map->get_map_x_size();
    map_y_size = tool_map->get_map_y_size();
  }

  std::vector<LineSegment> routePath(std::vector<LineSegment> paths, float z_height_limit);
};


#endif
