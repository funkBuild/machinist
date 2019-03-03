#ifndef __PATH_OPTIMIZER_H_INCLUDED__
#define __PATH_OPTIMIZER_H_INCLUDED__

class PathOptimizer;

#include <emscripten/bind.h>
#include <cmath>
#include <vector>
#include <map>
#include <iostream>
#include "point_2d.h"
#include "line_segment.h"
#include "point_3d.h"
#include "path_3d.h"

struct Direction_2d {
  int x = 0;
  int y = 0;
};

class PathOptimizer {
private:
  std::vector<Path_3d> paths;
  std::vector<Path_3d> optimized_paths;

  void deconstruct_on_z(std::vector<LineSegment> unoptimized_paths);

public:
  PathOptimizer(std::vector<LineSegment> unoptimized_paths)
  {
    deconstruct_on_z(unoptimized_paths);
  }

  std::vector<Path_3d> optimize();

  static std::vector<Path_3d> optimize_path(std::vector<LineSegment> unoptimized_paths);
};


#endif
