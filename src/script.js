import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'

// projects
import projectForeground from '../assets/images/project-foreground.png'
import javaOne from '../assets/images/java.png'
import javaTwo from '../assets/images/java-programming-I.png'
import javaThree from '../assets/images/java-programming-II.png'
import spring_image from '../assets/images/spring.png'
import html_css from '../assets/images/html-css.png'
import logo from '../assets/images/png/logo.png'
import weather_app from '../assets/images/weather-app.png'
import crypto_ticker from '../assets/images/crypto-ticker.png'
import portfolio from '../assets/images/portfolio.png'

// certificates
import javaCert from '../assets/certificates/java.png'
import java1Cert from '../assets/certificates/java-1.png'
import java2Cert from '../assets/certificates/java-2.png'
import springCert from '../assets/certificates/spring.png'
import htmlCssCert from '../assets/certificates/html-css.png'

// logo 
const logoImage = document.querySelector("#favicon");
logoImage.href = logo;


// loading images
// project images
const employeeDirectory = document.querySelector("#employee-directory");
const transcription = document.querySelector("#transcription");
const forecast = document.querySelector("#forecast");
const cryptoTicker = document.querySelector("#crypto-ticker");
const portfolioWebsite = document.querySelector("#portfolio");

employeeDirectory.src = projectForeground;
transcription.src = weather_app;
forecast.src = weather_app;
cryptoTicker.src = crypto_ticker;
portfolioWebsite.src = portfolio;

// certificate images
const javaBackground = document.querySelector("#javaBackground");
const javaCertificate = document.querySelector("#javaCert");
const javaOneBackground = document.querySelector("#javaOneBackground");
const javaOneCertificate = document.querySelector("#javaOneCert");
const javaTwoBackground = document.querySelector("#javaTwoBackground");
const javaTwoCertificate = document.querySelector("#javaTwoCert");
const springBackground = document.querySelector("#springBackground");
const springCertificate = document.querySelector("#springCert");
const htmlCssBackground = document.querySelector("#htmlCssBackground");
const htmlCssCertificate = document.querySelector("#htmlCssCert");


javaBackground.src = javaOne;
javaCertificate.src = javaCert;
javaOneBackground.src = javaTwo;
javaOneCertificate.src = java1Cert;
javaTwoBackground.src = javaThree;
javaTwoCertificate.src = java2Cert;
springBackground.src = spring_image;
springCertificate.src = springCert;
htmlCssBackground.src = html_css;
htmlCssCertificate.src = htmlCssCert;


// Texture Loader
const loader = new THREE.TextureLoader();
const star = loader.load('./star.png');
const java = loader.load('./rotating-images/java.png')
const spring = loader.load('./rotating-images/spring.png')
const mysql = loader.load('./rotating-images/mysql.png')
const html = loader.load('./rotating-images/html.png')
const css = loader.load('./rotating-images/css.png')
const javascript = loader.load('./rotating-images/javascript.png')



// Debug
const gui = new dat.GUI()
dat.GUI.toggleHide();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(0.6, 32, 32);

// Create a new plane geometry with the same size as the sphere
const imageGeometry = new THREE.PlaneGeometry(0.6, 0.6);



// Setting the position and color of stars
const colors = [
    new THREE.Color(0xAFC9FF), 
    new THREE.Color(0xC7D8FF), 
    new THREE.Color(0xFFF4F3), 
    new THREE.Color(0xFFE5CF),
    new THREE.Color(0xFFD9B2),
    new THREE.Color(0xFFC78E),
    new THREE.Color(0xFFA651),
];

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const positionArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 5;

    const color = colors[Math.floor(Math.random() * 4)];
    color.toArray(colorArray, i * 3);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3)); // set the color attribute


// Materials

const material = new THREE.PointsMaterial({
    size: 0.0005
});


const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    alphaTest: 0.1,
    map: star,
    blending: THREE.AdditiveBlending,
});

// Create a new material with the image textures
const javaMaterial = new THREE.MeshBasicMaterial({ map: java, transparent: true });
const javascriptMaterial = new THREE.MeshBasicMaterial({ map: javascript, transparent: true });
const springMaterial = new THREE.MeshBasicMaterial({ map: spring, transparent: true });
const mysqlMaterial = new THREE.MeshBasicMaterial({ map: mysql, transparent: true });
const htmlMaterial = new THREE.MeshBasicMaterial({ map: html, transparent: true });
const cssMaterial = new THREE.MeshBasicMaterial({ map: css, transparent: true });

const materials = [javaMaterial, javascriptMaterial, springMaterial, mysqlMaterial, htmlMaterial, cssMaterial];
const materialsSize = materials.length;

for (let i = 0; i < materialsSize; i++) {
    const material = materials[i];
    material.opacity = 0.6;
}



// Mesh
const sphere = new THREE.Points(geometry, material)

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);

// Create a new mesh with the geometry and material
const javaMesh = new THREE.Mesh(imageGeometry, javaMaterial);
const javascriptMesh = new THREE.Mesh(imageGeometry, javascriptMaterial);
const springMesh = new THREE.Mesh(imageGeometry, springMaterial);
const mysqlMesh = new THREE.Mesh(imageGeometry, mysqlMaterial);
const htmlMesh = new THREE.Mesh(imageGeometry, htmlMaterial);
const cssMesh = new THREE.Mesh(imageGeometry, cssMaterial);



scene.add(sphere, javaMesh, javascriptMesh, springMesh, mysqlMesh, htmlMesh, cssMesh, particlesMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'), 1)

// Mouse
document.addEventListener('mousemove', animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
    mouseY = event.clientY;
    mouseX = event.clientX;
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const meshes = [javaMesh, springMesh, mysqlMesh, htmlMesh, cssMesh, javascriptMesh];
const meshCount = meshes.length;
const rotationSpeed = 0.08;


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = .1 * elapsedTime;
    particlesMesh.rotation.y = -.1 * elapsedTime;



    if (mouseX > 0) {
        particlesMesh.rotation.x = -mouseY * (elapsedTime % 20 * 0.00008);
        particlesMesh.rotation.y = -mouseX * (elapsedTime % 20 * 0.00008);     
    }
    

    // Update Orbital Controls
    // controls.update()
    
    // Set mesh positions
    for (let i = 0; i < meshCount; i++) {
        const mesh = meshes[i];
        mesh.position.y = 0;
        mesh.position.x = 0.8 * Math.cos((elapsedTime * rotationSpeed) + (i * 1));
        mesh.position.z = 0.8 * Math.sin((elapsedTime * rotationSpeed) + (i * 1));
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();
