// src/components/BrainFoundationPage.tsx
"use client"
import React, { Suspense, useState, useMemo, useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import { diseaseData, Disease } from "../../Components/brainData";

interface BrainModelProps {
  highlightMeshNames: string[];
}

function BrainModel({ highlightMeshNames }: BrainModelProps) {
  const defaultMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xcccccc, 
        transparent: true,
        opacity: 0.3,
        roughness: 0.5,
        metalness: 0.5,
      }),
    []
  );

  const highlightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xff4444, // Jaskrawy czerwony
        roughness: 0.3,
        metalness: 0.2,
        emissive: 0xff0000, // Lekka poświata
        emissiveIntensity: 0.5,
      }),
    []
  );

  // Wczytujemy model .obj z folderu /public
  // Uwaga: To wymaga, aby plik /public/brain.obj istniał
  const obj = useLoader(OBJLoader, "/brain.obj");

  // Klonujemy obiekt, aby móc bezpiecznie modyfikować materiały
  // bez wpływu na oryginalny załadowany zasób
  const model = useMemo(() => obj.clone(), [obj]);
  
  // Używamy useEffect do iterowania po modelu i zmiany materiałów
  // za każdym razem, gdy zmieni się lista podświetlanych siatek
  useEffect(() => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Sprawdzamy, czy nazwa bieżącej siatki (child.name)
        // znajduje się na liście do podświetlenia
        if (highlightMeshNames.includes(child.name)) {
          child.material = highlightMaterial;
        } else {
          child.material = defaultMaterial;
        }
      }
    });
  }, [model, highlightMeshNames, defaultMaterial, highlightMaterial]);

  // 'primitive' pozwala wstawić gotowy obiekt three.js (jak nasz model)
  return <primitive object={model} scale={1.0} />; // Dostosuj 'scale' do rozmiaru modelu
}

// --- Główny Komponent Strony ---

export function BrainFoundationPage() {
  return (
    <div>
      <div className="sketchfab-embed-wrapper">
        <iframe
          title="human-brain"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/e073c2590bc24daaa7323f4daa5b7784/embed"
          style={{ width: '100%', height: '500px' }}
        ></iframe>
        <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
          <a
            href="https://sketchfab.com/3d-models/human-brain-e073c2590bc24daaa7323f4daa5b7784"
            target="_blank"
            rel="nofollow"
            style={{ fontWeight: 'bold', color: '#1CAAD9' }}
          >
            human-brain
         </a>
        </p>
      </div>
    </div>
  );
}

export default BrainFoundationPage;