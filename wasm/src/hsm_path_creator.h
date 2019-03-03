#ifndef __HSM_PATH_CREATOR_H_INCLUDED__
#define __HSM_PATH_CREATOR_H_INCLUDED__
/*
class HsmPathCreator;

#include <emscripten/bind.h>
#include <iostream>
#include <cmath>
#include <vector>
#include <iterator>
#include <map>
#include "point_2d.h"
#include "line_segment.h"

struct MapTile {
  bool cuttable = false;
  bool visited = false;
};

class HsmPathCreator {
private:
  int map_offset = 5;
  const float target_engagement = 0.02;

  int map_x_size, map_y_size;
  float stepover_distance, x_step_length, y_step_length, z_depth_max, z_depth_start, z_depth_step;
  int tool_radius;
  float* map;
  uintptr_t map_ptr;

  std::vector<std::vector<MapTile>> material_map;

  float get_map_height(int x, int y);
  void initMaterialMap();
  void initCutterMap();
  float get_tool_engagement(int x, int y);
  void printMaterialMap(Point_2d cutter_location);
  Point_2d get_next_move(Point_2d cutter_location);
  void mark_as_visited(Point_2d cutter_location);

public:
  HsmPathCreator(uintptr_t map_ptr, emscripten::val params)
    : map( reinterpret_cast<float*>(map_ptr) )
    , map_ptr( map_ptr )
  {
    map_x_size = params["mapXSize"].as<int>();
    map_y_size = params["mapYSize"].as<int>();
    stepover_distance = params["stepoverDistance"].as<float>();
    x_step_length = params["xStepLength"].as<float>();
    y_step_length = params["yStepLength"].as<float>();
    z_depth_max = params["zDepthMax"].as<float>();
    z_depth_start = params["zDepthStart"].as<float>();
    z_depth_step = params["zDepthStep"].as<float>();
    tool_radius = (params["toolDiameter"].as<float>() / 2) / x_step_length;  // TODO: x_Step must equal y_step
    map_offset = tool_radius;
  }

  void getPath();
};
*/
#endif

