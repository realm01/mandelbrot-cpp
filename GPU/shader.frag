// use opengl 4 in order to do double precision
#version 410
out vec4 frag_colour;

uniform double width;
uniform double height;

// 2d vectors with double precision
uniform dvec2 x_map;
uniform dvec2 y_map;

const vec4 start_color = vec4(0.32734, 0.16745, 0.6382, 1.0);
const vec4 end_color = vec4(0.783474, 0.62384, 0.92635, 1.0);

void main () {
  dvec2 z, c;
  c.x = gl_FragCoord.x / width * abs(x_map.x - x_map.y) + x_map.x;
  c.y = gl_FragCoord.y / height * abs(y_map.x - y_map.y) + y_map.x;

  z.x = 0.0;
  z.y = 0.0;

  int max_iterations = 1000;
  int i = 0;
  for(i = 0; i < max_iterations; i++) {
    if(z.x * z.x + z.y * z.y > 4.0) break;

    double x_tmp = z.x * z.x - z.y * z.y + c.x;
    z.y = 2.0 * z.x * z.y + c.y;
    z.x = x_tmp;
  }

  if(i > max_iterations - 1) {
    frag_colour = vec4(0.0, 0.0, 0.0, 1.0);
  }else{
    float c = sqrt(float(i) / float(max_iterations));
    frag_colour = start_color * c + end_color * (1 - c);
  }
}
