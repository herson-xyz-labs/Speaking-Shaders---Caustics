import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { shaderMaterial, OrbitControls, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei'
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
        }
    );

    const { envMapIntensity } = useControls('environment map', { 
        envMapIntensity: { value: 1, min: 0, max: 12} 
    });

    return <>
        <OrbitControls />

        <Environment
            background 
            files={ './environmentMaps/1/hdri.hdr'}
        />

        <mesh
            scale={ 5 }
            position-z={ 0 }
            rotation-y={ Math.PI * 0.5 }>
            <sphereGeometry/>
            <causticsMaterial
                side={ THREE.BackSide }
                ref={ causticsMaterial } />
        </mesh>

        <mesh
            scale={ 3 }
            position-z={ 0 }>
            <torusGeometry/>
            <MeshTransmissionMaterial 
                         transmission={3.0}
                         roughness={0.3}
                         thickness={0.1}
                         normalScale={[0.4, 0.4]}
                         color={"#fa9600"} />
                         {/* color={"#0064fa"} /> */}
                         {/* color={"#fa00e1"} /> */}
                         {/* color={"#9600fa"} /> */}
        </mesh>
        {/* <mesh
                rotation-x={ Math.PI * -.5 }
                scale={ 30 }>
                <planeGeometry />
                <meshBasicMaterial />
        </mesh> */}

        {/* <mesh
            scale= { 10 }
            rotation-y={ Math.PI / 2 }
            position-y={ 0 }
            position-z={ -5 }>
            <planeGeometry 
                scale={ 1.3 }/>
            <causticsMaterial 
                ref={ causticsMaterial } />
        </mesh> */}
    </>
}