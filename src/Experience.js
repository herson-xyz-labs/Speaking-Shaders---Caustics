import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend, useLoader } from '@react-three/fiber'
import causticsFragmentShader from './shaders/causticsFragmentShader.frag'
import causticsVertexShader from './shaders/causticsVertexShader.vert'

const createCausticsMaterial = (texture) => shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('hotpink'),
        uColorEnd: new THREE.Color('mediumpurple'),
        uTexture: texture,
    },
    causticsVertexShader,
    causticsFragmentShader
);

export default function Experience() 
{
    const texture = useLoader(THREE.TextureLoader, './caust_001.png');
    const CausticsMaterial = createCausticsMaterial(texture);

    extend({ CausticsMaterial })

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
            <causticsMaterial />
        </mesh>

    </>
}