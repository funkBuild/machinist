#include "main.h"
#include <vector>
#include <iostream>

using namespace emscripten;

val MachinistCore::createSweepLinePath(emscripten::val params){
  SweepLinePathCreator path_creator(model, params);
  return path_creator.getPath();
}

/*
val MachinistCore::createSweepLinePath(emscripten::val params){
  emscripten::val returnVal = emscripten::val( 
    emscripten::typed_memory_view<float>(
      return_array.size(), &return_array[0]
    )
  );

  return returnVal;
}
*/

val SimulateCore::getPolygons(){
  //polygon_array.clear();

  stock->toPolygons(
    &polygon_store,
    polygon_store.getStore(0)
  );
/*
  emscripten::val returnVal = emscripten::val( 
    emscripten::typed_memory_view<float>(
      polygon_array.size(), &polygon_array[0]
    )
  );
*/
  return polygon_store.toObject(); //getStore(0)->toObject();
}


void SimulateCore::setTool(emscripten::val tool_params){
  delete tool;
  tool = new ToolProjection(
    tool_params["diameter"].as<float>(),
    tool_params["length"].as<float>(),
    tool_params["resolution"].as<float>()
  );
}

void SimulateCore::toolCollision(emscripten::val tool_location){
  std::vector<Point3d> test_points = tool->getCollisionPoints(
    tool_location["x"].as<float>(),
    tool_location["y"].as<float>(),
    tool_location["z"].as<float>()
  );
  stock->doToolCollision(&test_points);
}

EMSCRIPTEN_BINDINGS(raw_pointers) {
  emscripten::class_<MachinistCore>("MachinistCore")
      .constructor<uintptr_t, int>(allow_raw_pointers())
      .function("createSweepLinePath", &MachinistCore::createSweepLinePath);

  emscripten::class_<SimulateCore>("SimulateCore")
      .constructor<float, float, float>()
      .function("getPolygons", &SimulateCore::getPolygons)
      .function("setTool", &SimulateCore::setTool)
      .function("toolCollision", &SimulateCore::toolCollision);
/*
  emscripten::class_<PathFinder>("PathFinder")
      .constructor<uintptr_t, int, int>(allow_raw_pointers())
      .function("setZHeightMinimum", &PathFinder::setZHeightMinimum)
      .function("setStartPoint", &PathFinder::setStartPoint)
      .function("setEndPoint", &PathFinder::setEndPoint)
      .function("route", &PathFinder::route);

  emscripten::class_<SweepLinePathCreator>("SweepLinePathCreator")
      .constructor<uintptr_t, val>(allow_raw_pointers())
      .function("getPath", &SweepLinePathCreator::getPath);

  //emscripten::class_<HsmPathCreator>("HsmPathCreator")
  //    .constructor<uintptr_t, val>(allow_raw_pointers())
  //    .function("getPath", &HsmPathCreator::getPath);
*/

}
