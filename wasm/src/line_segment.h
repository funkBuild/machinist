#ifndef __LINE_SEGMENT_H_INCLUDED__
#define __LINE_SEGMENT_H_INCLUDED__

#include <algorithm>
#include "point_2d.h"

enum class LineType:uint32_t
{
    CUTTING = 0,
    RAPID = 1
};

struct LineSegment
{
  Point_2d start;
  Point_2d end;
  std::vector<float> z_height;
  LineType line_type = LineType::CUTTING;
  
  void reverse() {
    Point_2d temp = start;
    start = end;
    end = temp;
    
    std::reverse(z_height.begin(), z_height.end());
  }
};

#endif
