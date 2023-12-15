uniform sampler2D uTexture;
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

void main()
{
    float speed1 = 0.02;
    float speed2 = 0.01;
    float scale1 = 2.0;
    float scale2 = 2.5;

    vec2 uv1 = fract((vUv * scale1) + vec2(uTime * speed1));
    vec2 uv2 = fract((vUv * scale2) + vec2(uTime * speed2));

    vec3 caustics1 = texture2D(uTexture, uv1).rgb;
    vec3 caustics2 = texture2D(uTexture, uv2).rgb;

    vec3 causticsEffect = min(caustics1, caustics2);
    vec3 sandColor = vec3(141.0/255.0, 130.0/255.0, 114.0/255.0);

    vec3 floor = causticsEffect * 0.4 + sandColor;

    gl_FragColor = vec4(floor, 1.0);
}