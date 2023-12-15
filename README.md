# Speaking Shaders - Caustics

#### Texture Sampling with Pre Computed Texture Map - Dual sampling of Caustic Texture
![](/public/documentation/2023-12-15-3_compressed.gif)

##### Syntax Changes in Fragment Shader

1. **RGB Split Technique:**
   - The shader now includes an RGB split effect for both `caustics1` and `caustics2`. This is achieved by offsetting the red and blue channels (`r1`, `b1`, `r2`, `b2`) based on a time-varying factor (`sin(uTime)`, `cos(uTime)`). The `splitAmount` variable controls the extent of this RGB separation.
    - The introduction of the `splitAmount` variable offers additional control over the visual effect, allowing developers to fine-tune the intensity of the RGB split to suit different aesthetic requirements or performance constraints.
   - This technique can create a chromatic aberration effect, adding an extra layer of realism and visual interest to the caustics effect.

2. **Enhanced UV Coordinate Manipulation:**
   - The manipulation of `uv1` and `uv2` is now more sophisticated, with an additional offset applied to create the RGB split. This adds further dynamism and texture to the visual effect.

3. **Combined Texture Effects:**
   - The `min(caustics1, caustics2)` operation remains, but now it combines the textures with the RGB split effect. This can result in more intricate and varied light patterns, simulating underwater lighting more effectively.

