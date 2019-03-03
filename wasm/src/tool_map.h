#ifndef __TOOL_MAP_H_INCLUDED__
#define __TOOL_MAP_H_INCLUDED__

class ToolMap;

#include <emscripten/bind.h>
#include <iostream>
#include <vector>
#include <unordered_map>
#include <cmath>

#include "height_map.h"
#include "point_2d.h"

class ToolMap {
private:
  HeightMap* height_map;
  Model* model;

  std::vector<std::vector<float>> tool_map;
  std::unordered_map<int64_t, float> tool_map_memo;
  std::vector<std::vector<float>> tool_projection;

  float boundry_offset, resolution, tool_diameter, tool_length;
  int tool_radius, tool_width;

  void create();
  void create_height_map();
  void project_endmill();
  float calc_tool_height(int x, int y);

public:
  ToolMap(Model* model, emscripten::val params)
    : model( model )
  {
    boundry_offset = params["boundryOffset"].as<float>();
    resolution =  params["resolution"].as<float>();
    tool_diameter = params["tool"]["diameter"].as<float>();
    boundry_offset = params["boundryOffset"].as<float>();
    tool_length = params["tool"]["length"].as<float>();
    tool_radius = (tool_diameter / 2) / resolution;

    create_height_map();
    project_endmill();
  }

  ~ToolMap() { }

  static std::vector<std::vector<float>> get_endmill_projection(float tool_diameter, float tool_length, float resolution);
  float get_height(int x, int y);
  int get_map_x_size();
  int get_map_y_size();
  float get_x_step_length();
  float get_y_step_length();
  float get_x_offset();
  float get_y_offset();
};

#endif
