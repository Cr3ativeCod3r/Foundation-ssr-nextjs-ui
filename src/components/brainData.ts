// src/data/brainData.ts

export interface Disease {
  id: string;
  name: string;
  description: string;
  // Nazwa (lub nazwy) siatek (mesh) w pliku .obj, które odpowiadają tej chorobie
  targetMeshNames: string[];
}

// UWAGA: Poniższe mapowania i opisy są PRZYKŁADOWE.
// Musisz dostosować 'targetMeshNames' do DOKŁADNYCH nazw siatek (obiektów) 
// w Twoim pliku brain.obj oraz zweryfikować poprawność merytoryczną opisów.

export const diseaseData: Disease[] = [
  {
    id: "parkinson",
    name: "Choroba Parkinsona",
    description: "Choroba neurodegeneracyjna wpływająca głównie na układ ruchowy. Związana jest z obumieraniem neuronów dopaminergicznych w istocie czarnej (Substantia Nigra).",
    targetMeshNames: ["substantia_nigra_left", "substantia_nigra_right"],
  },
  {
    id: "alzheimer",
    name: "Choroba Alzheimera",
    description: "Najczęstsza przyczyna otępienia. Charakteryzuje się postępującą utratą pamięci i funkcji poznawczych. Kluczowe zmiany zachodzą m.in. w hipokampie i korze entorynalnej.",
    targetMeshNames: ["hippocampus_left", "hippocampus_right"],
  },
  {
    id: "stroke",
    name: "Udar mózgu",
    description: "Stan zagrożenia życia spowodowany zatrzymaniem dopływu krwi do części mózgu. Obszar uszkodzenia zależy od zablokowanej tętnicy (np. udar w obszarze tętnicy środkowej mózgu).",
    targetMeshNames: ["middle_cerebral_artery_territory"], // To bardzo duży i przykładowy obszar
  },
  {
    id: "epilepsy",
    name: "Padaczka (Epilepsja)",
    description: "Zaburzenie neurologiczne charakteryzujące się nawracającymi napadami padaczkowymi. Ogniska padaczkowe często lokalizują się w płacie skroniowym.",
    targetMeshNames: ["temporal_lobe_left", "temporal_lobe_right"],
  },
  {
    id: "ms",
    name: "Stwardnienie Rozsiane (MS)",
    description: "Przewlekła choroba autoimmunologiczna, w której układ odpornościowy niszczy osłonki mielinowe nerwów. Zmiany (plaki) mogą występować w całej istocie białej.",
    targetMeshNames: ["corpus_callosum", "white_matter_lesions"], // 'white_matter'
  },
  {
    id: "migraine",
    name: "Migrena",
    description: "Silny, napadowy ból głowy. Choć mechanizm jest złożony, kluczową rolę odgrywa aktywacja układu trójdzielno-naczyniowego i nadwrażliwość struktur pnia mózgu.",
    targetMeshNames: ["brainstem"], // Pień mózgu
  },
  {
    id: "spasticity",
    name: "Spastyczność",
    description: "Zwiększone napięcie mięśniowe spowodowane uszkodzeniem górnego neuronu ruchowego w mózgu lub rdzeniu kręgowym (np. w korze ruchowej).",
    targetMeshNames: ["motor_cortex_left", "motor_cortex_right"],
  },
  {
    id: "tremor",
    name: "Drżenie samoistne",
    description: "Najczęstsze zaburzenie ruchowe. Przyczyny nie są do końca znane, ale często wiąże się je z nieprawidłowym funkcjonowaniem obwodów w móżdżku.",
    targetMeshNames: ["cerebellum"], // Móżdżek
  },
];