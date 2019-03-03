#include "hsm_path_creator.h"
/*
using namespace emscripten;

float HsmPathCreator::get_map_height(int x, int y) {
  return this->map[y + map_y_size * x];
}

void HsmPathCreator::initMaterialMap(){
  material_map.reserve(map_x_size + 2*map_offset);

  for(int x=0; x < 2*map_offset + map_x_size; x++){
    material_map[x].reserve(map_y_size + 2*map_offset);

    for(int y=0; y < 2*map_offset + map_y_size; y++){
      MapTile this_tile;

      if( y > map_offset && y < (map_offset + map_y_size) &&
          x > map_offset && x < (map_offset + map_x_size) )
        this_tile.cuttable = true;

      material_map[x].push_back(this_tile); //get_map_height(x,y) <= 5);
    }
  }

  return;
}

void HsmPathCreator::initCutterMap(){
  cutter_map.reserve(2*tool_radius);

  for(int x = -1 * tool_radius; x <= tool_radius; x++) {
    cutter_map[x].reserve(2*tool_radius);

    for(int y = -1*tool_radius; y <= tool_radius; y++) {
      float offset_distance = std::sqrt(x*x + y*y);

      if(offset_distance < tool_radius)
        material_map[x].push_back(1); //get_map_height(x,y) <= 5);
      else
        material_map[x].push_back(0);
    }
  }

  for(int x = -1 * tool_radius; x <= tool_radius; x++) {
    for(int y = -1*tool_radius; y <= tool_radius; y++) {
      
    }
  }
  
  return;
}

void HsmPathCreator::printMaterialMap(Point_2d cutter_location){
  for(int y=0; y < map_y_size + 2*map_offset; y++){
    for(int x=0; x < map_x_size + 2*map_offset; x++){

      int cx = cutter_location.x - x;
      int cy = cutter_location.y - y;
      float offset_distance = std::sqrt(cx*cx + cy*cy);

      if(offset_distance < tool_radius)
        std::cout << 'X';
      else if(material_map[x][y].cuttable)
        std::cout << '.';
      else
        std::cout << ' ';
    }
    std::cout << '\n';
  }

  return;
}

// TODO: optimize by only checking the edge points of the tool. There's a formula for it, probably
float HsmPathCreator::get_tool_engagement(int x_position, int y_position) {
  int cut_count = 0;
  int total_count = 0;

  for(int x = -1 * tool_radius; x <= tool_radius; x++) {
    for(int y = -1*tool_radius; y <= tool_radius; y++) {
      float offset_distance = std::sqrt(x*x + y*y);

      if(offset_distance < tool_radius) {
        total_count++;

        int x_cur = x + x_position;
        int y_cur = y + y_position;

        if(x_cur >= 0 && y_cur >= 0 &&
           material_map[x_cur][y_cur].cuttable == true) {
          cut_count++;
        }
      }
    }
  }
  //std::cout << "tool_radius : " << tool_radius << '\n';
  //std::cout << "cut count : " << cut_count << '\n';
  //std::cout << "total count : " << total_count << '\n';
  float engagement = (float)cut_count / (float)total_count;

  //std::cout << "engagement : " << engagement << '\n';

  return engagement;
}

void HsmPathCreator::mark_as_visited(Point_2d cutter_location) {
  for(int x = -1 * tool_radius; x <= tool_radius; x++) {
    for(int y = -1*tool_radius; y <= tool_radius; y++) {
      float offset_distance = std::sqrt(x*x + y*y);

      if(offset_distance < tool_radius) {
        int x_cur = x + cutter_location.x;
        int y_cur = y + cutter_location.y;

        if(x_cur >= 0 && y_cur >= 0 &&
           material_map[x_cur][y_cur].cuttable == true) {
          material_map[x_cur][y_cur].cuttable = false;
        }
      }
    }
  }
}

Point_2d HsmPathCreator::get_next_move(Point_2d cutter_location) {
  const int neib_indexes[] = { 1,0, -1,0, 0,1, 0,-1 };
  const int move_length = 2;

  float best_engagement = 99;
  Point_2d best_position;

  for(short i=0; i < 8; i += 2) {
    int next_x_position = cutter_location.x + move_length * neib_indexes[i];
    int next_y_position = cutter_location.y + move_length * neib_indexes[i + 1];

    //std::cout << "x: " << next_x_position << '\n';
    //std::cout << "y : " << next_y_position << '\n';

    MapTile next_map_tile = material_map[next_x_position][next_y_position];
    if(next_map_tile.visited) continue;

    float engagement = get_tool_engagement(next_x_position, next_y_position);
    float engage_error = std::abs( target_engagement - engagement );
    //std::cout << "engage_error: " << engage_error << '\n';

    if(engagement != engage_error < best_engagement) {
      best_engagement = engage_error;
      best_position.x = next_x_position;
      best_position.y = next_y_position;
    }
  }
  //std::cout << "best_position x: " << best_position.x << '\n';
  //std::cout << "best_position y : " << best_position.y << '\n';
  //std::cout << "best_engagement_err : " << best_engagement << "\n\n";
  return best_position;
}

void HsmPathCreator::getPath() {
  initMaterialMap();

  Point_2d cutter_location;
  cutter_location.x = 20;
  cutter_location.y = 20;
  mark_as_visited(cutter_location);

  for(int i=0; i < 300; i++) {
    cutter_location = get_next_move(cutter_location);
    material_map[cutter_location.x][cutter_location.y].visited = true;
    mark_as_visited(cutter_location);

    printMaterialMap(cutter_location);
    //std::cout << "x: " << cutter_location.x << '\n';
    //std::cout << "y : " << cutter_location.y << '\n';
  }

}
*/
