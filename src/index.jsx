import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        gl={{ antialias: true }}
        camera={{
            position: [2, 7, 2],
            fov: 45,
            near: 0.1,
            far: 150
        }}>
        <Experience />
    </Canvas>
)