import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel'
import * as TWEEN from '@tweenjs/tween.js'

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
const forecast = document.querySelector("#forecast");
const cryptoTicker = document.querySelector("#crypto-ticker");
const portfolioWebsite = document.querySelector("#portfolio");
const backtrackVisualizer = document.querySelector("#backtrack-visualizer");
const mazeVisualizer = document.querySelector("#maze-visualizer");

employeeDirectory.src = projectForeground;
forecast.src = weather_app;
cryptoTicker.src = crypto_ticker;
portfolioWebsite.src = portfolio;
backtrackVisualizer.src = portfolio;
mazeVisualizer.src = portfolio;

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




let camera, scene, renderer, pointlight;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let materials = [];
let meshes = [];
const colors = [
    new THREE.Color(0xAFC9FF), 
    new THREE.Color(0xC7D8FF), 
    new THREE.Color(0xFFF4F3), 
    new THREE.Color(0xFFE5CF),
    new THREE.Color(0xFFD9B2),
    new THREE.Color(0xFFC78E),
    new THREE.Color(0xFFA651),
];
const canvas = document.querySelector('canvas.webgl')





init();
animate();





function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 2300;

    const zoomTween = new TWEEN.Tween(camera.position)
        .to({ z: 1000 }, 5000) // set the target position and duration
        .easing(TWEEN.Easing.Quadratic.InOut) // set the easing function
        .onUpdate(() => {
            camera.updateProjectionMatrix(); // update the camera's projection matrix
    });

    // start the zoom tween when the window loads

    window.addEventListener('load', () => {
       
       setTimeout(function() {
            zoomTween.start();
       }, 2500);

    });


    scene = new THREE.Scene();

    pointlight = new THREE.PointLight( 0xFFA500, 100000, 1000 );
    pointlight.position.set( 0, 500, 1000 );
    scene.add( pointlight );
    
    

    const particlesGeometry = new THREE.BufferGeometry();

    // Create a new plane geometry for the images
    const imageGeometry = new THREE.PlaneGeometry(400, 400);
    
    const vertices = [];

    for ( let i = 0; i < 10000; i ++ ) {

        const x = Math.random() * 4000 - 2000;
        const y = Math.random() * 4000 - 2000;
        const z = Math.random() * 4000 - 2000;

        vertices.push( x, y, z );

    }

    particlesGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );


    // Create a new material with the image textures
    
    const javaMaterial = new THREE.MeshBasicMaterial({ map: java, transparent: true });
    const javascriptMaterial = new THREE.MeshBasicMaterial({ map: javascript, transparent: true });
    const springMaterial = new THREE.MeshBasicMaterial({ map: spring, transparent: true });
    const mysqlMaterial = new THREE.MeshBasicMaterial({ map: mysql, transparent: true });
    const htmlMaterial = new THREE.MeshBasicMaterial({ map: html, transparent: true });
    const cssMaterial = new THREE.MeshBasicMaterial({ map: css, transparent: true });

    materials = [javaMaterial, javascriptMaterial, springMaterial, mysqlMaterial, htmlMaterial, cssMaterial];
    const materialsSize = materials.length;

    for (let i = 0; i < materialsSize; i++) {
        const material = materials[i];
        if (window.innerWidth > 1400) {
            material.opacity = 0.3;
        } else if (window.innerWidth > 1000) {
            material.opacity = 0.3;
        } else {
            material.opacity = 0.2;
        }
        
    }

    // Create a new mesh with the geometry and material
    const javaMesh = new THREE.Mesh(imageGeometry, javaMaterial);
    const javascriptMesh = new THREE.Mesh(imageGeometry, javascriptMaterial);
    const springMesh = new THREE.Mesh(imageGeometry, springMaterial);
    const mysqlMesh = new THREE.Mesh(imageGeometry, mysqlMaterial);
    const htmlMesh = new THREE.Mesh(imageGeometry, htmlMaterial);
    const cssMesh = new THREE.Mesh(imageGeometry, cssMaterial);

    meshes = [javaMesh, springMesh, mysqlMesh, javascriptMesh, htmlMesh, cssMesh];

    // Particles
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        alphaTest: 0.2,
        map: star,
        blending: THREE.AdditiveBlending  
    });

    // Set the color of each particle at random from the colors array

    const positionArray = particlesGeometry.getAttribute('position').array;
    const colorArray = new Float32Array(positionArray.length);

    for ( let i = 0; i < positionArray.length; i += 3 ) {
        const color = colors[Math.floor(Math.random() * colors.length)]; // choose a random color
        color.toArray(colorArray, i); // assign the color to the colorArray
    }

    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3)); // add the color attribute to the geometry


    const particles = new THREE.Points( particlesGeometry, particlesMaterial );
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;


    scene.add( particles, javaMesh, javascriptMesh, springMesh, htmlMesh, mysqlMesh, cssMesh );

    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
 
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(new THREE.Color('#21282a'), 1)
    document.body.appendChild( renderer.domElement );

    document.body.addEventListener( 'mousemove', onPointerMove );

    window.addEventListener( 'resize', onWindowResize );

}



function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}






const cubeLoader = new THREE.CubeTextureLoader();
const cubeMap = cubeLoader.load([
    './space/px.jpg',
    './space/nx.jpg',
    './space/py.jpg',
    './space/ny.jpg',
    './space/pz.jpg',
    './space/nz.jpg',
]);



//  Black Hole

let sphereGeometry; 
let sphereMaterial;



sphereGeometry = new THREE.SphereGeometry( 350, 64, 32 );
sphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
        envMap: { value: cubeMap },
        time: { value: 0 },
        lensStrength: { value: 1 }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    side: THREE.DoubleSide,
    transparent: false,
});




const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);


scene.add(sphere);




function onPointerMove( event ) {

    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );

}




function animate() {

    requestAnimationFrame( animate );
    TWEEN.update();
    render();

}



function render() {
    
    const meshCount = meshes.length;
    const rotationSpeed = 1;

    const time = Date.now() * 0.00005;

    camera.position.x += ( mouseX - camera.position.x ) * 0.02;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.02;


    camera.lookAt( scene.position );

    for ( let i = 0; i < scene.children.length; i ++ ) {

        const object = scene.children[ i ];


        if ( object instanceof THREE.Points ) {

            object.rotation.y = time

        }

        if ( object.geometry instanceof THREE.SphereGeometry ) {
            
            object.rotation.z = time

        }

        if ( object.material instanceof THREE.ShaderMaterial) {

            const time = performance.now() * 0.002;
            object.material.uniforms.time.value = time;
            object.material.uniforms.lensStrength.value = Math.sin(time * 0.5) * 0.5 + 0.1;
        }


    }

    // Set mesh positions
    for (let i = 0; i < meshCount; i++) {

        const mesh = meshes[i];
        mesh.position.y = 0;
        mesh.position.x = 500 * Math.cos((time * rotationSpeed) + (i * 1));
        mesh.position.z = 500 * Math.sin((time * rotationSpeed) + (i * 1));
    }

    
    renderer.render( scene, camera );


}

