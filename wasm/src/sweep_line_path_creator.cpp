#include "sweep_line_path_creator.h"

using namespace emscripten;

float SweepLinePathCreator::get_map_height(int x, int y) {
  return tool_map->get_height(x, y);
}

emscripten::val SweepLinePathCreator::getPath(){
  createRoutedPaths();

  std::vector<LineSegment> paths;
  MoveAndPlungePath plunge_path_creator(tool_map);

  paths.insert( paths.end(), layers[0].begin(), layers[0].end() );

  for(int i=0; i < layers.size()-1; i++){
    LineSegment plunge_start = layers[i].back();
    LineSegment plunge_end = layers[i+1][0];
    std::cout << "Create Plunge path\n";
    std::vector<LineSegment> plunge_path = plunge_path_creator.createPath(plunge_start, plunge_end);
    std::cout << "Finish Plunge path\n";
    paths.insert( paths.end(), plunge_path.begin(), plunge_path.end() );
    paths.insert( paths.end(), layers[i+1].begin(), layers[i+1].end() );
  }

  std::vector<Path_3d> optimized_path = PathOptimizer::optimize_path(paths);

  std::vector<float> return_array;

  // TODO: fixme, starting point shouldn't be 0,0,0
  return_array.push_back(0);
  return_array.push_back(0);
  return_array.push_back(0);
  return_array.push_back(0);

  for(auto const& path: optimized_path) {
    return_array.push_back(static_cast<uint32_t>(path.line_type));
    //return_array.push_back(path.start.x * x_step_length + x_offset);
    //return_array.push_back(path.start.y * y_step_length + y_offset);
    //return_array.push_back(path.start.z);

    return_array.push_back(path.end.x * x_step_length + x_offset);
    return_array.push_back(path.end.y * y_step_length + y_offset);
    return_array.push_back(path.end.z);
  }

  emscripten::val returnVal = emscripten::val( 
    emscripten::typed_memory_view<float>(
      return_array.size(), &return_array[0]
    )
  );

  return returnVal;
/*
    std::cout << "####" << '\n';
    for(auto const& value: paths) {
      std::cout << "Line " << value.start.x << ',' << value.start.y << " :: " << value.end.x << ',' << value.end.y << '\n';
      for(auto const& z_h: value.z_height) {
       std::cout << z_h << ", ";
      }
      std::cout << "\n\n";
    };
    std::cout << "####" << '\n';
*/
/*
      emscripten::val returnVal = emscripten::val( 
        emscripten::typed_memory_view<int>(
          return_path.size(), &return_path[0]
        )
      );

      return returnVal;
*/      
}

void SweepLinePathCreator::createRoutedPaths() {
  float stepover_delta = stepover_distance / x_step_length;

  PathFinder path_finder(tool_map);
  
  for(float z = z_depth_start; z > z_depth_max; z -= z_depth_step) {
    float z_height_upper = z;
    float z_height_lower = z - z_depth_step;
    std::vector<LineSegment> paths;

    PathRouter router(tool_map);
    path_finder.setZHeightMinimum( z_height_lower );

    for(int x = 0; x < map_x_size; x += stepover_delta) {
      // TODO: Allow a flag to switch to y orriented line sweep
      std::vector<LineSegment> current_paths = getLinePathsX(x , z_height_lower, z_height_upper);

      paths.insert(
        paths.end(),
        std::make_move_iterator(current_paths.begin()),
        std::make_move_iterator(current_paths.end())
      );
    }

    std::vector<LineSegment> routed_paths = router.routePath(paths, z_height_lower);
    paths.clear();

    for(int i = 0; i < routed_paths.size()-1; i++){
      paths.push_back(routed_paths[i]);

      LineSegment start = routed_paths[i];
      LineSegment end = routed_paths[i+1];

      path_finder.setStartPoint(start.end.x, start.end.y);
      path_finder.setEndPoint(end.start.x, end.start.y);
      std::vector<LineSegment> linking_path = path_finder.route();

      for(auto & path : linking_path) {
        path.line_type = LineType::RAPID;
      }
      paths.insert(
        paths.end(),
        std::make_move_iterator(linking_path.begin()),
        std::make_move_iterator(linking_path.end())
      );
    };

    paths.push_back(routed_paths.back());

    layers.push_back( paths );

    /*
    std::cout << "###\n";
    for(auto & path : paths) {
      std::cout << "start " << path.start.x << " :: " << path.start.y << '\n';
      std::cout << "end " << path.end.x << " :: " << path.end.y << '\n';
      for(auto const& z_h: path.z_height) {
        std::cout << z_h << ", ";
      }
      std::cout << '\n';
      std::cout << "###\n";
    }
    */
  }

  return;
}

std::vector<LineSegment> SweepLinePathCreator::getLinePathsX(int x, float height_min, float height_max) {
  std::vector<LineSegment> lines;
  LineSegment current_line; // TODO: This should be null by default
  current_line.start.x = -1;
  current_line.start.y = -1;

  //std::cout << "Start line x = " << x << '\n';

  for(int idx = 0; idx < map_y_size; idx++) {
    bool line_allowed = get_map_height(x, idx) < height_max;
    //std::cout << "y = " << idx << ", line_allowed = " << line_allowed << '\n';
    //std::cout << "current_line = " << current_line.start.x << ":" << current_line.start.y << '\n';
    // TODO: use math min here instead if it exists
    float min_z_height = std::max( height_min, get_map_height(x, idx));
    
    if(!(current_line.start.x >= 1) && line_allowed) {
      // Start a new line
      //std::cout << "Starting a new line" << '\n';
      current_line.start.x = x;
      current_line.start.y = idx;
      current_line.z_height.push_back(min_z_height);

    } else if((current_line.start.x >= 0) && !line_allowed) {
      //std::cout << "Closing the line" << '\n';
      current_line.end.x = x;
      current_line.end.y = idx - 1;
      lines.push_back(current_line);

      current_line.start.x = -1;
      current_line.start.y = -1;
      current_line.z_height.clear();

    } else if(current_line.start.x >= 0) {
      //std::cout << "Continue the line" << '\n';
      current_line.z_height.push_back(min_z_height);
    }
  }

    if(current_line.start.x >= 0) {
      current_line.end.x = x;
      current_line.end.y = map_y_size - 1;
      lines.push_back(current_line);
    }
/*
  for(auto const& value: lines) {
    std::cout << "Line " << value.start.x << ' ' << value.start.y << " :: " << value.end.x << ' ' << value.end.y << '\n';
    for(auto const& z_h: value.z_height) {
      std::cout << z_h << ", ";
    }
    std::cout << '\n';
  };
  std::cout << "####" << '\n';
*/
  return lines;
}
