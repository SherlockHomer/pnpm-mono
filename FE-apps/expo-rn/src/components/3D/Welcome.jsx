import { Canvas } from '@react-three/fiber';

export default function Welcome() {
  return (
    <Canvas>
      <mesh>
        <sphereGeometry></sphereGeometry>
        <meshStandardMaterial color='orange'></meshStandardMaterial>
      </mesh>
    </Canvas>
  );
}
