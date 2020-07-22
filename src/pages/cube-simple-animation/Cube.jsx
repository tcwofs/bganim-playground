import React, { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Cube = () => {
  const mount = useRef(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  scene.background = new THREE.Color(0x121212);
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.add(cube);
  camera.position.z = 5;

  const handleResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }, [camera, renderer]);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }, [camera, cube.rotation.x, cube.rotation.y, renderer, scene]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    mount.current.appendChild(renderer.domElement);
    animate();
  }, [animate, camera, cube, mount, renderer, scene]);

  return (
    <div>
      <div ref={(ref) => (mount.current = ref)} />
    </div>
  );
};

export default Cube;
