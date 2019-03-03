#ifndef __MAIN_H_INCLUDED__
#define __MAIN_H_INCLUDED__

#include "model.h"
#include "path_finder.h"
#include "sweep_line_path_creator.h"
#include "path_router.h"
#include "tool_map.h"
#include "models/quadtree_node.h"
#include "tool_projection.h"
//#include "hsm_path_creator.h"

class MachinistCore;

class MachinistCore {
private:
  Model* model;

public:
  MachinistCore(uintptr_t triangles_ptr, int num_triangles)
  {
    model = new Model(triangles_ptr, num_triangles);
  }
  
  ~MachinistCore() {
    delete model;
  }

  emscripten::val createSweepLinePath(emscripten::val params);
};

class SimulateCore {
private:
  QuadTreeNode* stock;
  ToolProjection* tool;
  SimPolygonStore polygon_store;

public:
  SimulateCore(float xSize, float ySize, float height)
  {
    stock = QuadTreeNode::build(xSize, ySize, height);
  }
  
  ~SimulateCore() {
    delete stock;
  }

  emscripten::val getPolygons();
  void setTool(emscripten::val tool_params);
  void toolCollision(emscripten::val tool_location);
};

#endif
