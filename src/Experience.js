import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { shaderMaterial, OrbitControls, MeshTransmissionMaterial, Environment, useFBO } from '@react-three/drei'
import { useFrame, extend, useLoader } from '@react-three/fiber'
import { useControls } from 'leva'
import causticsFragmentShader from './shaders/causticsFragmentShader.frag'
import causticsVertexShader from './shaders/causticsVertexShader.vert'

const CausticsMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('hotpink'),
        uColorEnd: new THREE.Color('mediumpurple'),
        uTexture: new THREE.Texture(),
    },
    causticsVertexShader,
    causticsFragmentShader
);

extend({ CausticsMaterial })

export default function Experience() 
{
    const texture = useLoader(THREE.TextureLoader, './caust_001.png');
    const causticsMaterial = useRef();
    const causticSphere = useRef();
    const seeThroughObject = useRef();
    const buffer = useFBO();

    useEffect(() => {
        if (causticsMaterial.current && texture && texture.image) {
            causticsMaterial.current.uniforms.uTexture.value = texture;
        }
    }, [texture]); // Re-run this effect when the texture is loaded

    useFrame((state, delta) => 
        {
            if (causticsMaterial.current) {
                causticsMaterial.current.uTime += delta;
            }

            causticSphere.current.visible = true;
            seeThroughObject.current.visible = false;
            state.gl.setRenderTarget(buffer);
            state.gl.render(state.scene, state.camera);
            state.gl.setRenderTarget(null);
            causticSphere.current.visible = false;
            seeThroughObject.current.visible = true;
        }
    );

    const { envMapIntensity } = useControls('environment map', { 
        envMapIntensity: { value: 1, min: 0, max: 12} 
    });

    const { transmission } = useControls('transmission', { 
        transmission: { value: 3, min: 0, max: 4} 
    });

    const { roughness } = useControls('roughness', { 
        roughness: { value: 0.3, min: 0, max: 1} 
    });

    return <>
        <OrbitControls />

        <Environment
            ground = {{
                height: 7,
                radius: 28,
                scale: 100,
                receiveShadow: true
            }}
            files={ './environmentMaps/1/hdri.hdr'}
            resolution={ 1024 }
        />

        <group ref={ causticSphere }>
            <mesh
                scale={ 5 }
                position-y={ 1 }
                rotation-y={ Math.PI * 0.5 }>
                <sphereGeometry/>
                <causticsMaterial
                    side={ THREE.BackSide }
                    ref={ causticsMaterial } />
            </mesh>
        </group>

        <mesh
            ref={ seeThroughObject }
            scale={ 1.5 }
            position-y={ 1 }>
            <boxGeometry
                args={ [3, 1, 1] }
                />
            <MeshTransmissionMaterial 
                        transmission={transmission}
                        roughness={roughness}
                        thickness={0.1}
                        normalScale={[0.4, 0.4]}
                        color={"#fa9600"} 
                        envMapIntensity={envMapIntensity}
                        buffer={buffer.texture}
                        />
                        {/* color={"#0064fa"} /> */}
                        {/* color={"#fa00e1"} /> */}
                        {/* color={"#9600fa"} /> */}
        </mesh>
    </>
}