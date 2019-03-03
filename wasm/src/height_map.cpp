#include "height_map.h"

using namespace emscripten;

void HeightMap::createMap(){
  Point2d test_point;

  for(int x = 0; x < map_x_size; x++){
    height_map.push_back( std::vector<float>() );
    
    for(int y = 0; y < map_y_size; y++){
      //std::cout << "y: " << y << '\n';
      test_point.x = x * x_step_length + x_offset;
      test_point.y = y * y_step_length + y_offset;

      height_map[x].push_back( model->hit( test_point ) );

      //std::cout << height_map[x][y] << ' ';
    }
    //std::cout << '\n';
    //std::cout << "x: " << x << '\n';
    //std::cout << "map_x_size: " << map_x_size << ", map_y_size: " << map_y_size << '\n';
  };
}

float HeightMap::get_height(int x, int y){
  return height_map[x][y];
}
