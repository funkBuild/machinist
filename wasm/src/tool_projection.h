#ifndef __TOOL_PROJECTION_H_INCLUDED__
#define __TOOL_PROJECTION_H_INCLUDED__

#include <iostream>
#include <vector>

class ToolProjection {
private:
  std::vector<std::vector<float>> height_map;
  float tool_diameter, tool_length, resolution;
  int tool_width, radius;

  void create_projection(){
    height_map.clear();

    for(int x=0; x < tool_width; x++){
      height_map.push_back( std::vector<float>() );

      for(int y=0; y < tool_width; y++){
        int delta_x = x - radius;
        int delta_y = y - radius;
        float distance = std::sqrt( delta_x*delta_x + delta_y*delta_y );

        if(distance <= radius) {
          height_map[x].push_back(0);
        } else {
          height_map[x].push_back(-1 * tool_length);
        }
      }
    }
  }

public:
  ToolProjection(float tool_diameter, float tool_length, float resolution)
    : tool_diameter( tool_diameter ), tool_length( tool_length ), resolution( resolution )
  {
    tool_width = (tool_diameter / resolution) + 1;
    radius = tool_diameter / (2 * resolution);

    create_projection();
  }

  ~ToolProjection() {}

  std::vector<Point3d> getCollisionPoints(float xOffset, float yOffset, float zOffset){
    std::vector<Point3d> collision_points;

    for(int x=0; x < tool_width; x++){
      height_map.push_back( std::vector<float>() );

      for(int y=0; y < tool_width; y++){
        float xPosition = xOffset + resolution * (float)(x - radius);
        float yPosition = yOffset + resolution * (float)(y - radius);
        float zPosition = zOffset - height_map[x][y];

        //std::cout << zPosition << " ";
        collision_points.push_back(Point3d(xPosition, yPosition, zPosition));
      }
      //std::cout << "\n";
    }
    return collision_points;
  }
};

#endif
