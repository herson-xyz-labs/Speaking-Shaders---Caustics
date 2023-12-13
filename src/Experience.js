export default function Experience() 
{
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
            <meshBasicMaterial color="greenyellow" />
        </mesh>
    </>
}