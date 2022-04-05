// License: MIT
// Author: Billy Chiu
// Adapted from https://math.stackexchange.com/questions/4293250/how-to-write-a-polar-equation-for-a-five-pointed-star

#define PI 3.14159265359

uniform float sides; // = 5.0;

vec4 transition (vec2 uv) {
  
  float radius = sqrt(pow(uv.x - 0.5, 2.0) + pow(uv.y - 0.5, 2.0));
  float theta = atan(uv.y - 0.5, uv.x - 0.5) - PI / 2.0;
  
  float n = sides > 5.0 ? sides : 5.0;
  float m = n - 2.0;
  float k = 1.0;
  
  float nom = cos((2.0 * asin(k) + PI * m) / (2.0 * n));
  float denom = cos((2.0 * asin(k * cos(n * theta)) + PI * m) / (2.0 * n));
  
  float r = nom / denom;
  
  // 2.0 is a magic number here
  if (r * progress * 2.0 > radius)
    return getFromColor(uv);
  else
    return getToColor(uv);
}
