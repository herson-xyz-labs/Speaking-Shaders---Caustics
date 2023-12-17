# Speaking Shaders - Caustics

## Texture Sampling with Pre Computed Texture Map - Blending Caustic Effect with Transmissive Material
![](/public/documentation/2023-12-16-1_compressed.gif)

#### Additional Imports:
- **Drei Components**: `OrbitControls`, `MeshTransmissionMaterial`, `Environment`, `Lightformer` are used for enhanced 3D scene control and rendering.
- **Leva**: `useControls` creates a UI for real-time control of properties.

#### Updated Experience Component:
- **OrbitControls**: Integrated for enhanced user interaction with the 3D scene.
- **Environment**: Adds an HDR environment map, improving lighting and reflection realism.
- **Meshes with New Materials**:
  - Sphere with the custom `CausticsMaterial`.
  - Torus with `MeshTransmissionMaterial`, suitable for glass-like effects.
- **Leva Controls**: Controls `envMapIntensity` dynamically.

#### Commented Out Code:
- Parts of the original scene are commented out, possibly for testing or simplification.

### Modified Fragment Shader

#### Uniforms and Varying: 
- Remains unchanged from the previous version.

#### Updated Main Function:
- **Adjusted Parameters**: Modifies `speed1`, `speed2`, `scale1`, `scale2`, and `splitAmount` values, likely for caustics animation adjustments.
- **Sand Color Change**: Alters `sandColor` to a different value, affecting the color scheme.
- **Color Commented Options**: Provides alternative color values for experimentation.
- **Caustics Effect Combination**: Directly adds `causticsEffect` and `sandColor`, potentially creating a more pronounced effect.

### Syntax and Architecture Insights

- **Enhanced Interactivity**: Incorporation of `OrbitControls` and `Environment` enhances user experience.
- **Material Diversity**: Introduction of `MeshTransmissionMaterial` adds complexity and realism.
- **Dynamic Control Integration**: Leva's `useControls` adds real-time user interactivity.
- **Shader Customization**: Indicates ongoing visual effect fine-tuning.

### Project Impact

The updates significantly elevate the project's visual and interactive capabilities, making the 3D scene more engaging and showcasing versatility in 3D web application development. These enhancements are beneficial in applications prioritizing user experience and visual quality, like virtual galleries or interactive educational tools. Continued shader refinements highlight a commitment to specific aesthetic or functional goals.
