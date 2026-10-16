import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Component, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// This scene is contained by the hero. The existing world below it is untouched.
class HeroBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

function Shield({ mobile, reduced }) {
  const group = useRef();
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 2.25);
    s.lineTo(1.65, 1.58);
    s.lineTo(1.48, -.2);
    s.quadraticCurveTo(1.28, -1.42, 0, -2.15);
    s.quadraticCurveTo(-1.28, -1.42, -1.48, -.2);
    s.lineTo(-1.65, 1.58);
    s.closePath();
    return s;
  }, []);
  const outline = useMemo(() => shape.getPoints(40).map(p => [p.x, p.y, .17]), [shape]);
  useFrame(({ clock, pointer }) => {
    if (!group.current || reduced) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = -.18 + Math.sin(t * .3) * .12 + pointer.x * .06;
    group.current.position.y = (mobile ? 1.55 : .15) + Math.sin(t * .6) * .1;
  });
  return <group ref={group} position={mobile ? [0, 1.55, -2.4] : [3.6, .15, -2]} scale={mobile ? .85 : 1.18} rotation={[.04, -.18, 0]}>
    <mesh>
      <extrudeGeometry args={[shape, { depth: .12, bevelEnabled: true, bevelSize: .045, bevelThickness: .04, bevelSegments: 2, steps: 1 }]}/>
      <meshStandardMaterial color="#0a2431" metalness={.8} roughness={.28} transparent opacity={.83}/>
    </mesh>
    <Line points={outline} color="#78ffe0" lineWidth={2.5}/>
    <group scale={.89}><Line points={outline} color="#287d7c" lineWidth={1}/></group>
    {/* A raised padlock makes the cybersecurity theme recognizable immediately. */}
    <group position={[0, .05, .24]}>
      <mesh position={[0, .55, 0]}><torusGeometry args={[.43, .075, 10, 40, Math.PI]}/><meshStandardMaterial color="#adffea" emissive="#5df4ca" emissiveIntensity={1.1}/></mesh>
      <mesh position={[-.43, .42, 0]}><boxGeometry args={[.15, .28, .14]}/><meshBasicMaterial color="#8cf5d8"/></mesh>
      <mesh position={[.43, .42, 0]}><boxGeometry args={[.15, .28, .14]}/><meshBasicMaterial color="#8cf5d8"/></mesh>
      <mesh position={[0, .05, 0]}><boxGeometry args={[1.16, .92, .2]}/><meshStandardMaterial color="#71e9cc" emissive="#267b6f" emissiveIntensity={.6} metalness={.55} roughness={.3}/></mesh>
      <mesh position={[0, .13, .111]}><circleGeometry args={[.11, 20]}/><meshBasicMaterial color="#09222a"/></mesh>
      <mesh position={[0, -.02, .112]}><planeGeometry args={[.09, .23]}/><meshBasicMaterial color="#09222a"/></mesh>
    </group>
    {[-1.12, -.96, -.8].map((y, i) => <Line key={y} points={[[-.48 + i * .06, y, .18], [.48 - i * .06, y, .18]]} color="#529c9c" lineWidth={1}/>)}
  </group>;
}

function SecurityNetwork({ mobile, reduced }) {
  const packetGroup = useRef(), scan = useRef();
  const paths = useMemo(() => Array.from({ length: mobile ? 10 : 18 }, (_, i) => {
    const y = (i % 9 - 4) * .66;
    const side = i % 2 ? 1 : -1;
    return [[side * 10, y, -3], [side * (5.8 + (i % 3) * .3), y, -3], [side * 4.7, y + .5, -3], [side * 1.7, y + .5, -3]];
  }), [mobile]);
  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.elapsedTime;
    packetGroup.current?.children.forEach((mesh, i) => {
      const p = paths[i], progress = (t * .14 + i * .073) % 1;
      const segment = Math.min(2, Math.floor(progress * 3)), f = progress * 3 - segment;
      mesh.position.set(...p[segment]).lerp(new THREE.Vector3(...p[segment + 1]), f);
    });
    if (scan.current) scan.current.position.y = Math.sin(t * .32) * 4;
  });
  return <>
    {paths.map((p, i) => <group key={i}><Line points={p} color={i % 3 ? '#246967' : '#3c8791'} lineWidth={1} transparent opacity={.55}/><mesh position={p[3]}><ringGeometry args={[.065, .085, 12]}/><meshBasicMaterial color="#67d9c5"/></mesh></group>)}
    <group ref={packetGroup}>{paths.map((p, i) => <mesh key={i} position={p[0]}><sphereGeometry args={[.038, 6, 6]}/><meshBasicMaterial color="#99ffe5"/></mesh>)}</group>
    <mesh ref={scan} position={[0, 0, -3.5]}><planeGeometry args={[28, .026]}/><meshBasicMaterial color="#7de5d2" transparent opacity={.16}/></mesh>
    {!mobile && <group position={[-4.8, -.25, -2.1]} rotation={[.1, .24, 0]}>{[0, 1, 2, 3].map(i => <group key={i} position={[0, (i - 1.5) * .74, 0]}>
      <mesh><boxGeometry args={[2.2, .54, .55]}/><meshStandardMaterial color="#0d2832" metalness={.75} roughness={.35}/></mesh>
      <Line points={[[-1.1, .27, .28], [1.1, .27, .28], [1.1, -.27, .28], [-1.1, -.27, .28], [-1.1, .27, .28]]} color="#438c90" lineWidth={1}/>
      {[0, 1, 2].map(j => <mesh key={j} position={[-.8 + j * .18, 0, .29]}><circleGeometry args={[.026, 8]}/><meshBasicMaterial color="#7bffcf"/></mesh>)}
      {[0, 1, 2, 3, 4].map(j => <mesh key={j} position={[.22 + j * .13, 0, .29]}><planeGeometry args={[.04, .21]}/><meshBasicMaterial color="#2d606b"/></mesh>)}
    </group>)}</group>}
  </>;
}

function Scene({ mobile, reduced }) {
  return <>
    <color attach="background" args={['#040d15']}/>
    <fog attach="fog" args={['#040d15', 12, 27]}/>
    <ambientLight intensity={.55}/>
    <pointLight position={[3, 4, 5]} intensity={25} color="#82ffdf"/>
    <pointLight position={[-5, 1, 3]} intensity={15} color="#5db3d5"/>
    <Shield mobile={mobile} reduced={reduced}/>
    <SecurityNetwork mobile={mobile} reduced={reduced}/>
    <gridHelper args={[70, mobile ? 35 : 65, '#21514e', '#123335']} position={[0, -3.5, -10]}/>
    {!reduced && <Sparkles count={mobile ? 25 : 65} scale={[23, 12, 10]} color="#75cabd" size={1.4} speed={.1} opacity={.35}/>}
    {!mobile && !reduced && <EffectComposer multisampling={0}><Bloom intensity={.48} luminanceThreshold={.8} mipmapBlur/></EffectComposer>}
  </>;
}

export default function CyberHero() {
  const host = useRef();
  const [active, setActive] = useState(true);
  const [mobile] = useState(() => innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(q.matches);
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    io.observe(host.current); q.addEventListener('change', change);
    return () => { io.disconnect(); q.removeEventListener('change', change); };
  }, []);
  return <div ref={host} className="cyber-hero-background" aria-hidden="true"><HeroBoundary><Canvas eventSource={document.body} eventPrefix="client" camera={{ position: [0, 0, 9], fov: 55 }} dpr={mobile ? 1 : [1, 1.5]} frameloop={!active ? 'never' : reduced ? 'demand' : 'always'} gl={{ antialias: !mobile, powerPreference: mobile ? 'low-power' : 'high-performance' }}><Scene mobile={mobile} reduced={reduced}/></Canvas></HeroBoundary></div>;
}
