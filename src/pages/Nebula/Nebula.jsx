/* eslint-disable react-hooks/exhaustive-deps */
import { BlendFunction, BloomEffect, EffectComposer, EffectPass, KernelSize, RenderPass } from 'postprocessing';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  FogExp2,
  BufferGeometry,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneBufferGeometry,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  WebGLRenderer,
  Float32BufferAttribute,
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  NoBlending,
  DoubleSide,
} from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

function makeElementObject(type, width, height) {
  const obj = new Object3D();

  const element = document.createElement(type);
  element.style.width = width + 'px';
  element.style.height = height + 'px';
  element.style.opacity = 0.999;
  element.style.boxSizing = 'border-box';

  var css3dObject = new CSS3DObject(element);
  obj.css3dObject = css3dObject;
  obj.add(css3dObject);

  // make an invisible plane for the DOM element to chop
  // clip a WebGL geometry with it.
  var material = new MeshPhongMaterial({
    opacity: 0.15,
    color: new Color(0x111111),
    blending: NoBlending,
    side: DoubleSide,
  });
  var geometry = new BoxGeometry(width, height, 1);
  var mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  obj.lightShadowMesh = mesh;
  obj.add(mesh);

  return obj;
}

const Nebula = () => {
  const mount = useRef(null);
  const sceneGl = new Scene();
  const sceneCss = new Scene();
  const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  const rendererGl = new WebGLRenderer({ antialias: true, alpha: true });
  const rendererCss = new CSS3DRenderer();
  const ambient = new AmbientLight(0x261b2e);
  const loader = new TextureLoader();
  const directionalLight = new DirectionalLight(0x382d43);
  const orangeLight = new PointLight(0xef7d57, 50, 450, 1.7);
  const redLight = new PointLight(0xb13e53, 50, 450, 1.7);
  const blueLight = new PointLight(0x29366f, 50, 450, 1.7);
  const bloomEffect = new BloomEffect({
    blendFunction: BlendFunction.COLOR_DODGE,
    kernelSize: KernelSize.SMALL,
    useLuminanceFilter: true,
    luminanceThreshold: 0.3,
    luminanceSmoothing: 0.75,
  });
  const rainGeo = new BufferGeometry();
  const rainVertices = [];
  const rainCount = 15000;
  const rainMaterial = new PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true });
  const effectPass = new EffectPass(camera, bloomEffect);
  const composer = new EffectComposer(rendererGl);
  const root = new Object3D();
  const background = makeElementObject('div', 500, 500);
  let cloudParticles = [];
  let rain;

  background.css3dObject.element.style.opacity = '0.6';
  background.css3dObject.element.style.padding = '0px';
  background.css3dObject.element.style.background = `#f4f4f4`;
  background.css3dObject.element.style.boxSizing = `content-box`;
  background.css3dObject.element.style.border = `2px solid #1a1c2c`;
  background.css3dObject.element.style.boxShadow = `1px 1px 0px 0px #1a1c2c`;

  const header = document.createElement('div');
  header.style.width = '100%';
  header.style.height = '20px';
  header.style.padding = '6px 0px 4px 0';
  header.style.borderBottom = '2px solid #1a1c2c';
  header.style.backgroundSize = '4px 4px';
  header.style.display = 'flex';
  header.style.justifyContent = 'center';
  header.setAttribute('id', 'header');
  header.innerHTML = '';

  const headerBackground = document.createElement('div');
  headerBackground.style.position = 'absolute';
  headerBackground.style.width = 'calc(100% - 20px)';
  headerBackground.style.height = '20px';
  headerBackground.style.margin = '0px 10px';
  headerBackground.style.top = '6px';
  headerBackground.style.backgroundImage = 'linear-gradient(to bottom, #1a1c2c, #1a1c2c 50%, #f4f4f4 50%, #f4f4f4)';
  headerBackground.style.backgroundSize = '4px 4px';

  const button = document.createElement('div');
  button.style.width = '14px';
  button.style.height = '14px';
  button.style.left = '25px';
  button.style.border = '2px solid #1a1c2c';
  button.style.outline = '2px solid #f4f4f4';
  button.style.zIndex = '2';
  button.style.position = 'absolute';
  button.style.background = '#f4f4f4';

  const text = document.createElement('div');
  text.innerHTML = 'About';
  text.style.padding = '0px 4px';
  text.style.height = '20px';
  text.style.zIndex = '2';
  text.style.position = 'relative';
  text.style.background = '#f4f4f4';
  text.style.fontSize = '1.1rem';
  text.style.fontFamily = '"Righteous", cursive';

  const body = document.createElement('div');
  body.innerHTML = "If you're afraid to die, then so am I";
  body.style.width = '100%';
  body.style.height = 'calc(100% - 40px)';
  body.style.justifyContent = 'center';
  body.style.alignItems = 'center';
  body.style.display = 'flex';
  body.style.fontSize = '1.6rem';
  body.style.fontFamily = '"Righteous", cursive';
  header.appendChild(button);
  header.appendChild(text);
  header.appendChild(headerBackground);
  background.css3dObject.element.appendChild(header);
  background.css3dObject.element.appendChild(body);
  rendererCss.domElement.style.position = 'absolute';
  rendererCss.domElement.style.top = 0;
  rendererCss.setSize(window.innerWidth, window.innerHeight);
  root.position.set(135, 1000, -450);
  root.rotation.x = 1.16;
  root.rotation.y = -0.12;
  root.rotation.z = 0.27;
  root.add(background);
  sceneCss.add(root);

  for (let i = 0; i < rainCount; i++) {
    rainVertices.push(Math.random() * 400 - 200, Math.random() * 500 - 250, Math.random() * 400 - 200);
  }
  rainGeo.setAttribute('position', new Float32BufferAttribute(rainVertices, 3));

  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;
  directionalLight.position.set(0, 0, 1);
  rain = new Points(rainGeo, rainMaterial);
  orangeLight.position.set(200, 300, 100);
  redLight.position.set(100, 300, 100);
  blueLight.position.set(300, 300, 200);
  rendererGl.domElement.style.position = 'absolute';
  rendererGl.domElement.style.zIndex = -1;
  rendererGl.domElement.style.top = 0;
  rendererGl.setClearColor(0x00ff00, 0.0);
  rendererGl.setSize(window.innerWidth, window.innerHeight);
  sceneGl.fog = new FogExp2(0x03544e, 0.001);
  sceneGl.background = new Color(0x121212);
  sceneGl.add(rain);
  sceneGl.add(directionalLight);
  sceneGl.add(orangeLight);
  sceneGl.add(redLight);
  sceneGl.add(blueLight);
  sceneGl.add(ambient);
  bloomEffect.blendMode.opacity.value = 1.5;
  effectPass.renderToScreen = true;
  composer.addPass(new RenderPass(sceneGl, camera));
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
      cloud.material.opacity = 0.55;
      cloudParticles.push(cloud);
      sceneGl.add(cloud);
    }
  });

  const handleResize = useCallback(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    rendererCss.setSize(window.innerWidth, window.innerHeight);
    rendererGl.setSize(window.innerWidth, window.innerHeight);
  }, [camera, rendererGl, rendererCss]);

  const animate = useCallback(() => {
    cloudParticles.forEach((p) => {
      p.rotation.z -= Math.random() * 0.001;
    });
    requestAnimationFrame(animate);
    composer.render(0.1);
    rendererCss.render(sceneCss, camera);
  }, [cloudParticles, composer, rendererCss]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    rendererCss.domElement.appendChild(rendererGl.domElement);
    mount.current.appendChild(rendererCss.domElement);
    animate();
  }, [animate, camera, mount, rendererCss]);

  return (
    <div>
      <div ref={(ref) => (mount.current = ref)} />
    </div>
  );
};

export default Nebula;
