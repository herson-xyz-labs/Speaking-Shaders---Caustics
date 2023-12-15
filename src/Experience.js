import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { shaderMaterial } from '@react-three/drei'
import { useFrame, extend, useLoader } from '@react-three/fiber'
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

    return <>
        <mesh
            position-x={ -2 }>
            <sphereGeometry />
            <meshBasicMaterial color="hotpink"/>
        </mesh>
        <mesh
            rotation-y={ Math.PI * 0.25}
            position-x={ 2 } 
            scale={ 1.5 }>
            <boxGeometry
                scale={ 1.5 }/>
            <meshBasicMaterial color="mediumpurple" />
        </mesh>
        <mesh
            rotation-x={ - Math.PI * 0.5 }
            scale= { 10 }
            position-y={ -1 }>
            <planeGeometry />
            <causticsMaterial ref={ causticsMaterial }/>
        </mesh>

    </>
}