/* eslint-disable react-hooks/exhaustive-deps */
import { BlendFunction, BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  FogExp2,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from 'three';

const Rain = () => {
  const mount = useRef(null);
  const scene = new Scene();
  const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  const renderer = new WebGLRenderer({ antialias: true });
  const ambient = new AmbientLight(0x0b0630);
  const loader = new TextureLoader();
  const directionalLight = new DirectionalLight(0xf8e3c4);
  const flash = new PointLight(0x6b1fb1, 30, 500, 1.7);
  const bloomEffect = new BloomEffect({
    blendFunction: BlendFunction.COLOR_DODGE,
    kernelSize: KernelSize.SMALL,
    useLuminanceFilter: true,
    luminanceThreshold: 0.3,
    luminanceSmoothing: 0.75,
  });
  const rainGeo = new BufferGeometry();
  const rainCount = 15000;
  const rainVertices = [];
  const rainMaterial = new PointsMaterial({ color: 0xaaaaaa, size: 0.1, transparent: true });
  const effectPass = new EffectPass(camera, bloomEffect);
  const composer = new EffectComposer(renderer);
  let cloudParticles = [];
  let rain;

  for (let i = 0; i < rainCount; i++) {
    rainVertices.push(Math.random() * 400 - 200, Math.random() * 500 - 250, Math.random() * 400 - 200, 0);
  }
  rainGeo.setAttribute('position', new Float32BufferAttribute(rainVertices, 4));

  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;
  directionalLight.position.set(0, 0, 1);
  flash.position.set(200, 300, 100);
  rain = new Points(rainGeo, rainMaterial);
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene.fog = new FogExp2(0x1c1c2a, 0.002);
  scene.background = new Color(0x121212);
  scene.add(directionalLight);
  scene.add(flash);
  scene.add(ambient);
  scene.add(rain);
  bloomEffect.blendMode.opacity.value = 1.5;
  effectPass.renderToScreen = true;
  composer.addPass(new RenderPass(scene, camera));

  loader.load(`${process.env.PUBLIC_URL}/img/cloud.png`, (texture) => {
    let cloudGeo = new PlaneBufferGeometry(500, 500);
    let cloudMaterial = new MeshLambertMaterial({
      map: texture,
      transparent: true,
    });

    for (let item = 0; item < 25; item++) {
      let cloud = new Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(Math.random() * 800 - 400, 500, Math.random() * 500 - 500);
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });

  const handleResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }, [camera, renderer]);

  const animate = useCallback(() => {
    const vertex = new Vector4();
    let positionAttribute = rainGeo.getAttribute('position');

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      vertex.w -= 0.1 + Math.random() * 0.1;
      vertex.y += vertex.w;

      if (vertex.y < -200) {
        vertex.y = 200;
        vertex.w = 0;
      }

      positionAttribute.setXYZW(i, vertex.x, vertex.y, vertex.z, vertex.w);
    }
    positionAttribute.needsUpdate = true;

    rain.rotation.y += 0.002;
    if (Math.random() > 0.99 || flash.power > 100) {
      if (flash.power < 100) flash.position.set(Math.random() * 400, 300 + Math.random() * 200, 100);
      flash.power = 50 + Math.random() * 500;
    }
    cloudParticles.forEach((p) => {
      p.rotation.z -= Math.random() * 0.001;
    });
    requestAnimationFrame(animate);
    composer.render(0.1);
  }, [cloudParticles, composer, flash, rain.rotation, rainGeo]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    mount.current.appendChild(renderer.domElement);
    animate();
  }, [animate, camera, mount, renderer, scene]);

  return <div ref={(ref) => (mount.current = ref)} />;
};

export default Rain;
