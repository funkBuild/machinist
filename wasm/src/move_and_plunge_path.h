#ifndef __MOVE_AND_PLUNGE_PATH_H_INCLUDED__
#define __MOVE_AND_PLUNGE_PATH_H_INCLUDED__

class MoveAndPlungePath;

#include <emscripten/bind.h>
#include <cmath>
#include <vector>
#include <map>
#include <iostream>
#include "point_2d.h"
#include "line_segment.h"
#include "path_finder.h"

class MoveAndPlungePath {
private:
  ToolMap* tool_map;
  int map_x_size, map_y_size;
  
  float get_map_height(int x, int y);
public:
  MoveAndPlungePath(ToolMap *tool_map_)
    : tool_map(tool_map_)
  {
    map_x_size = tool_map->get_map_x_size();
    map_y_size = tool_map->get_map_y_size();
  }

  std::vector<LineSegment> createPath(LineSegment start, LineSegment end);
};


#endif
