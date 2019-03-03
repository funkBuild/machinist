#ifndef __SIM_POLYGON_STORE_H_INCLUDED__
#define __SIM_POLYGON_STORE_H_INCLUDED__

#include <emscripten/val.h>
#include <emscripten.h>

#include <vector>
#include <unordered_map>

using namespace emscripten;

class PolygonStore {
public:
  unsigned int id;
  bool has_been_modified;
  std::vector<float> vertices;
  std::vector<unsigned short int> indices[6];

  PolygonStore(unsigned int id) : id(id) {};

  val toObject(){
/*    std::vector<val> faces;

    for(int i=0; i < 6; i++){
      faces.push_back(val(
        emscripten::typed_memory_view<unsigned short int>(indices[i].size(), &indices[i][0])
      ));
    }
*/
    val object = val::object();
	  object.set("id", val(id));

	  object.set("vertices", val(
      emscripten::typed_memory_view<float>(vertices.size(), &vertices[0])
    ));

	  //object.set("indices", val::array(faces));

    return object;
  };
};

class SimPolygonStore {
private:
  std::unordered_map<unsigned int, PolygonStore*> polygon_map;

public:
  SimPolygonStore() {};
  ~SimPolygonStore() {
    std::for_each(polygon_map.begin(), polygon_map.end(), [&](std::pair<signed int, PolygonStore*> element){
      delete element.second;
  	});
  };

  PolygonStore* getStore(unsigned int id){
    if(!polygon_map[id])
      polygon_map[id] = new PolygonStore(id);
    else {
      polygon_map[id]->vertices.clear();

      for(int i=0; i < 6; i++){
        polygon_map[id]->indices[i].clear();
      }
    }

    return polygon_map[id];
  }

  val toObject(){
    std::vector<val> array;

    std::for_each(polygon_map.begin(), polygon_map.end(), [&](std::pair<unsigned int, PolygonStore*> element){
      array.push_back(element.second->toObject());
  	});

    return val::array(array);
  }
};

#endif
