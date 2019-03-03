#include "tool_map.h"

using namespace emscripten;

void ToolMap::create_height_map(){
  height_map = new HeightMap(model, resolution, boundry_offset);
}

void ToolMap::create(){
  for(int x = 0; x < height_map->map_x_size; x++){
    tool_map.push_back( std::vector<float>() );

    for(int y = 0; y < height_map->map_y_size; y++){
      tool_map[x].push_back( get_height(x, y) );
      //std::cout << tool_map[x][y] << ' ';
    }
    //std::cout << '\n';
  }
}

float ToolMap::get_height(int x, int y){
  if(x < 0 || x >= height_map->map_x_size) return 0.0;
  if(y < 0 || y >= height_map->map_y_size) return 0.0;

  int64_t key = ((int64_t) x << 32) | y;
  auto it = tool_map_memo.find(key);
  float result;

  if ( it == tool_map_memo.end() ) {
    result = calc_tool_height(x, y);
    tool_map_memo.insert(	{key, result});
    //std::cout << "Not found\n";
  } else {
    //std::cout << "Found\n";
    result = it->second;
  }

  return result;
}

float ToolMap::calc_tool_height(int x, int y){
  const int tool_center = std::floor( tool_width / 2);
  float height_max = 0;
  int delta_x, delta_y;

  for(int test_x = 0; test_x < tool_width; test_x++){
    delta_x = x - test_x + tool_center;

    if( delta_x < 0 || delta_x >= height_map->map_x_size ) continue;

    for(int test_y = 0; test_y < tool_width; test_y++){
      delta_y = y - test_y + tool_center;

      if( delta_y >= 0 && delta_y < height_map->map_y_size) {
        height_max = std::max(
          height_map->get_height(delta_x, delta_y) + tool_projection[test_x][test_y],
          height_max
        ); 
      }
    }
  }

  return height_max;
}

void ToolMap::project_endmill(){
  tool_width = (tool_diameter / height_map->x_step_length) + 1;
  int radius = tool_diameter / (2 * height_map->x_step_length);

  std::cout << "radius : " << radius << ", tool_width : " << tool_width << '\n';

  for(int x=0; x < tool_width; x++){
    tool_projection.push_back( std::vector<float>() );

    for(int y=0; y < tool_width; y++){
      int delta_x = x - radius;
      int delta_y = y - radius;
      float distance = std::sqrt( delta_x*delta_x + delta_y*delta_y );

      //std::cout << "delta_x : " << delta_x << ", delta_y : " << delta_y << ", distance : " << distance << '\n';
      //std::cout << "radius : " << radius << '\n';

      if(distance <= radius) {
        tool_projection[x].push_back(0);
      } else {
        tool_projection[x].push_back(-1 * tool_length);
      }

      //std::cout << tool_projection[x][y] << ' ';
    }
    //std::cout << "\n\n\n";
  }
}

int ToolMap::get_map_x_size(){
  return height_map->map_x_size;
}

int ToolMap::get_map_y_size(){
  return height_map->map_y_size;
}

float ToolMap::get_x_step_length(){
  return height_map->x_step_length;
}

float ToolMap::get_y_step_length(){
  return height_map->y_step_length;
}

float ToolMap::get_x_offset(){
  return height_map->x_offset;
}

float ToolMap::get_y_offset(){
  return height_map->y_offset;
}
