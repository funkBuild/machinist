#ifndef __HEIGHT_MAP_H_INCLUDED__
#define __HEIGHT_MAP_H_INCLUDED__

class HeightMap;

#include <emscripten/bind.h>
#include <iostream>
#include <cmath>
#include <vector>
#include <iterator>
#include <map>

#include "model.h"


class HeightMap {
private:
  Model* model;

  std::vector<std::vector<float>> height_map;

  void createMap();
public:
  int map_x_size, map_y_size, num_triangles;
  float x_step_length, y_step_length, x_offset, y_offset;

  HeightMap(Model* model, float resolution, float boundry_offset)
    : model( model )
  {
    x_step_length = resolution;
    y_step_length = resolution;

    map_x_size = (model->bounding_box.top.x + 2*boundry_offset) / x_step_length;
    map_y_size = (model->bounding_box.top.y + 2*boundry_offset) / y_step_length;

    x_offset = -1 * boundry_offset;
    y_offset = -1 * boundry_offset;

    std::cout << "map_x_size: " << map_x_size << ", map_y_size: " << map_y_size << '\n';
    std::cout << "origin_x: " << model->bounding_box.bottom.x << ", origin_y: " << model->bounding_box.bottom.y << '\n';
    std::cout << "x_step_length: " << x_step_length << ", y_step_length: " << y_step_length << '\n';
    std::cout << "x_offset: " << x_offset << ", y_offset: " << y_offset << "\n\n";

    createMap();
  }

  ~HeightMap() {

  }

  float get_height(int x, int y);
};

#endif
