uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

void main() {
    float speed1 = 0.04;
    float speed2 = 0.02;
    float scale1 = 2.0;
    float scale2 = 2.5;
    float splitAmount = 0.005; // Set your split amount

    vec2 uv1 = fract((vUv * scale1) + vec2(uTime * speed1));
    vec2 uv2 = fract((vUv * scale2) + vec2(uTime * speed2));

    // RGB split for the first caustics texture
    vec2 uv1Offset = vec2(splitAmount * sin(uTime), splitAmount * cos(uTime));
    float r1 = texture2D(uTexture, uv1 + uv1Offset).r;
    float g1 = texture2D(uTexture, uv1).g;
    float b1 = texture2D(uTexture, uv1 - uv1Offset).b;
    vec3 caustics1 = vec3(r1, g1, b1);

    // RGB split for the second caustics texture
    vec2 uv2Offset = vec2(splitAmount * cos(uTime), splitAmount * sin(uTime));
    float r2 = texture2D(uTexture, uv2 + uv2Offset).r;
    float g2 = texture2D(uTexture, uv2).g;
    float b2 = texture2D(uTexture, uv2 - uv2Offset).b;
    vec3 caustics2 = vec3(r2, g2, b2);

    vec3 causticsEffect = min(caustics1, caustics2);
    vec3 sandColor = vec3(0.0/255.0, 100.0/255.0, 250.0/255.0);
    //vec3 sandColor = vec3(0.0/255.0, 225.0/255.0, 250.0/255.0);
    //vec3 sandColor = vec3(25.0/255.0, 0.0/255.0, 250.0/255.0);
    //vec3 sandColor = vec3(150.0/255.0, 0.0/255.0, 250.0/255.0);
    //vec3 sandColor = vec3(0.0/255.0, 250.0/255.0, 25.0/255.0);
    //vec3 sandColor = vec3(250.0/255.0, 0.0/255.0, 225.0/255.0);

    vec3 floor = causticsEffect + sandColor;

    gl_FragColor = vec4(floor, 1.0);
}
