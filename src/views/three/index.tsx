import React, { FC,useEffect, useRef   } from "react";
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建一个三位场景-scene
// const scene = new THREE.Scene();

// 创建一个几何体 长方体  长宽高都是100
// const geometry = new THREE.BoxGeometry(100, 100, 100);



const Three: FC = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // init
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    (divRef  as any).current.appendChild(renderer.domElement);

    // animation
    function animation(time: number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }
  }, []);
  return (
    <div ref={divRef}/>
  )
}

export default Three