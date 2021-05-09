import React, { useCallback, useEffect, useRef, useMemo } from 'react';
import { AmbientLight, BoxGeometry, Color, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

const Cube = () => {
  const mount = useRef(null);
  const scene = useMemo(() => new Scene(), []);
  const camera = useMemo(() => new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000), []);
  const renderer = useMemo(() => new WebGLRenderer({ antialias: true }), []);
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  const directionalLight = new DirectionalLight(0xffffff);
  const ambient = new AmbientLight(0x555555);

  camera.position.z = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);
  directionalLight.position.set(0, 5, 5);
  directionalLight.target = cube;
  scene.background = new Color(0x121212);
  scene.add(directionalLight);
  scene.add(cube);
  scene.add(ambient);

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
  }, [camera, cube.rotation, renderer, scene]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    mount.current.appendChild(renderer.domElement);
    animate();
  }, [animate, mount, renderer]);

  return (
    <div>
      <div ref={(ref) => (mount.current = ref)} />
    </div>
  );
};

export default Cube;
