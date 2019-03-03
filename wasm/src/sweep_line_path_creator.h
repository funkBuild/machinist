#ifndef __SWEEP_LINE_PATH_CREATOR_H_INCLUDED__
#define __SWEEP_LINE_PATH_CREATOR_H_INCLUDED__

class SweepLinePathCreator;

#include <emscripten/bind.h>
#include <iostream>
#include <cmath>
#include <vector>
#include <iterator>
#include <map>

#include "point_2d.h"
#include "line_segment.h"
#include "path_router.h"
#include "path_finder.h"
#include "move_and_plunge_path.h"
#include "path_optimizer.h"
#include "tool_map.h"
#include "model.h"

class SweepLinePathCreator {
private:
  int map_x_size, map_y_size;
  float stepover_distance, x_step_length, y_step_length, z_depth_max, z_depth_start, z_depth_step, x_offset, y_offset;
  Model* model;
  ToolMap* tool_map;

  std::vector<std::vector<LineSegment>> layers;

  float get_map_height(int x, int y);
  std::vector<LineSegment> getLinePathsX(int x, float height_min, float height_max);
  void createRoutedPaths();
public:
  SweepLinePathCreator(Model* model, emscripten::val params)
    : model(model)
  {
    tool_map = new ToolMap(model, params);
    
    map_x_size = tool_map->get_map_x_size();
    map_y_size = tool_map->get_map_y_size();
    x_step_length = tool_map->get_x_step_length();
    y_step_length = tool_map->get_y_step_length();
    x_offset = tool_map->get_x_offset();
    y_offset = tool_map->get_y_offset();

    stepover_distance = params["tool"]["diameter"].as<float>() * params["stepoverPercent"].as<float>() / 100;
    z_depth_max = params["zDepthMax"].as<float>();
    z_depth_start = params["zDepthStart"].as<float>();
    z_depth_step = params["zDepthStep"].as<float>();
  }

  emscripten::val getPath();
};

#endif
