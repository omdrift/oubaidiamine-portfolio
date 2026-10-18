window.portfolioStudies={
  "flow": {
    "title": [
      "Modéliser les panaches de fumée",
      "Modelling smoke plumes"
    ],
    "intro": [
      "Projet M2 réalisé en équipe. Étude visuelle de la collecte vidéo, du PyMatting et de la génération de panaches par Flow Matching conditionnel.",
      "Team MSc project. A visual walkthrough of video acquisition, PyMatting and plume generation using conditional Flow Matching."
    ],
    "cover": {
      "src": "images/flow/flow-original.png",
      "width": 544,
      "height": 544,
      "caption": [
        "Panache du dataset",
        "A plume from the dataset"
      ],
      "alt": [
        "Panache du dataset",
        "A plume from the dataset"
      ]
    },
    "stats": [
      {
        "value": "Project RISE",
        "label": [
          "Corpus source",
          "Source corpus"
        ]
      },
      {
        "value": "64 × 64",
        "label": [
          "Images du modèle",
          "Model images"
        ]
      },
      {
        "value": "8 × 8 × 256",
        "label": [
          "Représentation latente",
          "Latent representation"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Collecte et pipeline",
          "Acquisition and pipeline"
        ],
        "body": [
          "Clips annotés issus de Project RISE : récupération des vidéos à partir des métadonnées, extraction des frames, segmentation temporelle puis préparation des données. Schéma du pipeline expérimenté : PyMatting, VQGAN, Flow Matching et intégration ODE.",
          "Annotated Project RISE clips: videos retrieved from metadata, frames extracted, temporal sequences prepared. The experimental pipeline combines PyMatting, VQGAN, Flow Matching and ODE integration."
        ],
        "media": [
          {
            "src": "images/flow/dataset-clip.mp4",
            "type": "video",
            "poster": "images/flow/dataset-frame.png",
            "caption": [
              "Extrait vidéo du corpus source",
              "Video excerpt from the source corpus"
            ],
            "alt": [
              "Extrait vidéo du corpus source",
              "Video excerpt from the source corpus"
            ],
            "width": 180,
            "height": 180
          },
          {
            "src": "images/flow/pipeline-experimental.svg",
            "width": 1400,
            "height": 540,
            "caption": [
              "Pipeline complet — schéma explicatif réalisé pour ce portfolio",
              "Complete pipeline — explanatory diagram created for this portfolio"
            ],
            "alt": [
              "Pipeline complet — schéma explicatif réalisé pour ce portfolio",
              "Complete pipeline — explanatory diagram created for this portfolio"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Isoler la fumée",
          "Isolating smoke"
        ],
        "body": [
          "Après estimation du fond, PyMatting calcule les composantes du panache et les zones de transparence : I = αF + (1 − α)B. L'objectif est d'isoler la dynamique de la fumée du décor industriel.",
          "After background estimation, PyMatting estimates the plume foreground and transparency: I = αF + (1 − α)B. The aim is to isolate smoke dynamics from the industrial scene."
        ],
        "media": [
          {
            "src": "images/flow/flow-original.png",
            "width": 544,
            "height": 544,
            "caption": [
              "Frame originale",
              "Original frame"
            ],
            "alt": [
              "Frame originale",
              "Original frame"
            ]
          },
          {
            "src": "images/flow/flow-matting.png",
            "width": 544,
            "height": 544,
            "caption": [
              "Fumée extraite",
              "Extracted foreground smoke"
            ],
            "alt": [
              "Fumée extraite",
              "Extracted foreground smoke"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Encoder avec VQGAN",
          "Encoding with VQGAN"
        ],
        "body": [
          "Le VQGAN reconstruit les images à partir de latents spatiaux 8 × 8 × 256. Les images ci-dessous montrent un exemple de reconstruction et une mosaïque d'extraction, reconstruction et recomposition depuis le dépôt. Sur quatre autres frames illustrées dans le diaporama, la moyenne est : MSE 160,7, PSNR 26,23 dB, SSIM 0,919 (reconstruction uniquement).",
          "VQGAN reconstructs frames from spatial 8 × 8 × 256 latents. The images below show a reconstruction example plus a repository mosaic of extraction, reconstruction and background composition. Across four other frames shown in the slides, mean MSE is 160.7, PSNR 26.23 dB, SSIM 0.919 (reconstruction only)."
        ],
        "media": [
          {
            "src": "images/flow/flow-matting.png",
            "width": 544,
            "height": 544,
            "caption": [
              "Avant encodage",
              "Before encoding"
            ],
            "alt": [
              "Avant encodage",
              "Before encoding"
            ]
          },
          {
            "src": "images/flow/flow-reconstruction.png",
            "width": 544,
            "height": 544,
            "caption": [
              "Reconstruction VQGAN",
              "VQGAN reconstruction"
            ],
            "alt": [
              "Reconstruction VQGAN",
              "VQGAN reconstruction"
            ]
          },
          {
            "src": "images/flow/vqgan-matting-comparison.png",
            "width": 2953,
            "height": 2984,
            "caption": [
              "Chaîne visuelle sur des exemples du dépôt : original, fumée isolée, VQGAN, recomposition et résultat final (scores du diaporama distincts)",
              "Repository examples: original, extracted plume, VQGAN reconstruction, background composition and final result (separate from slide metrics)"
            ],
            "alt": [
              "Chaîne visuelle sur des exemples du dépôt : original, fumée isolée, VQGAN, recomposition et résultat final (scores du diaporama distincts)",
              "Repository examples: original, extracted plume, VQGAN reconstruction, background composition and final result (separate from slide metrics)"
            ]
          }
        ],
        "blocks": [
          [
            "Image 64 × 64",
            "64 × 64 image"
          ],
          [
            "Encodeur",
            "Encoder"
          ],
          [
            "Latent 8 × 8 × 256",
            "8 × 8 × 256 latent"
          ],
          [
            "Décodeur",
            "Decoder"
          ]
        ]
      },
      {
        "title": [
          "Apprendre la dynamique",
          "Learning the dynamics"
        ],
        "body": [
          "Le Flow Matching conditionnel apprend un champ de vitesses entre bruit latent et latent de frame future. La dynamique est conditionnée sur l'historique : la démonstration utilise 10 images réelles initiales, puis des prédictions réinjectées à l'aide d'une fenêtre glissante. Les animations montrent des extraits distincts du dépôt.",
          "Conditional Flow Matching learns a velocity field between latent noise and the latent of a future frame. The model is conditioned on temporal history: the demonstration starts with 10 observed frames and feeds predictions into a rolling window. Animations show independent examples from the repository."
        ],
        "media": [
          {
            "src": "images/flow/real-sequence.gif",
            "width": 128,
            "height": 128,
            "caption": [
              "Séquence réelle du dépôt",
              "Real sequence from the repository"
            ],
            "alt": [
              "Séquence réelle du dépôt",
              "Real sequence from the repository"
            ]
          },
          {
            "src": "images/flow/generated-sequence.gif",
            "width": 128,
            "height": 128,
            "caption": [
              "Séquence générée du dépôt",
              "Generated sequence from the repository"
            ],
            "alt": [
              "Séquence générée du dépôt",
              "Generated sequence from the repository"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Génération par intégration ODE",
          "ODE-based generation"
        ],
        "body": [
          "Le champ appris est intégré par un solveur ODE dans l'espace latent. La présentation illustre 100 étapes de calcul, le décodage de la frame 11 et la réutilisation d'une fenêtre de contexte pour générer progressivement les frames 12 à 36. Le schéma ci-dessous représente ce mécanisme ; il n'est pas une courbe de performance ni une visualisation mesurée des états latents.",
          "The learned field is integrated with an ODE solver in latent space. The slides illustrate 100 integration steps, decoding frame 11 and reusing a context window to progressively generate frames 12 through 36. The diagram below explains this process, not a measured latent trajectory or a performance curve."
        ],
        "media": [
          {
            "src": "images/flow/ode-trajectory-explainer.svg",
            "width": 1400,
            "height": 680,
            "caption": [
              "Schéma conceptuel : 10 observations, 100 pas ODE et rollout autoregressif 11–36",
              "Conceptual diagram: 10 observed frames, 100 ODE steps and autoregressive rollout 11–36"
            ],
            "alt": [
              "Schéma conceptuel : 10 observations, 100 pas ODE et rollout autoregressif 11–36",
              "Conceptual diagram: 10 observed frames, 100 ODE steps and autoregressive rollout 11–36"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Prédictions à court horizon",
          "Short-horizon predictions"
        ],
        "body": [
          "Exemples d'images 11 à 13 : les panaches prédits préservent une partie de la silhouette, mais leur position, leurs contours et leur texture ne coïncident pas toujours avec les frames réelles. Cette galerie présente une comparaison qualitative, pas une précision moyenne sur jeu de test.",
          "Example frames 11 through 13: predicted plumes retain some overall silhouette, but their location, boundaries and texture do not always match the real frames. This gallery is a qualitative comparison, not an average held-out test accuracy."
        ],
        "media": [
          {
            "src": "images/flow/flow-real-11.png",
            "width": 267,
            "height": 267,
            "caption": [
              "Réel · frame 11",
              "Real · frame 11"
            ],
            "alt": [
              "Réel · frame 11",
              "Real · frame 11"
            ]
          },
          {
            "src": "images/flow/flow-predicted-11.png",
            "width": 267,
            "height": 266,
            "caption": [
              "Généré · frame 11",
              "Generated · frame 11"
            ],
            "alt": [
              "Généré · frame 11",
              "Generated · frame 11"
            ]
          },
          {
            "src": "images/flow/flow-real-12.png",
            "width": 267,
            "height": 267,
            "caption": [
              "Réel · frame 12",
              "Real · frame 12"
            ],
            "alt": [
              "Réel · frame 12",
              "Real · frame 12"
            ]
          },
          {
            "src": "images/flow/flow-predicted-12.png",
            "width": 267,
            "height": 266,
            "caption": [
              "Généré · frame 12",
              "Generated · frame 12"
            ],
            "alt": [
              "Généré · frame 12",
              "Generated · frame 12"
            ]
          },
          {
            "src": "images/flow/flow-real-13.png",
            "width": 267,
            "height": 267,
            "caption": [
              "Réel · frame 13",
              "Real · frame 13"
            ],
            "alt": [
              "Réel · frame 13",
              "Real · frame 13"
            ]
          },
          {
            "src": "images/flow/flow-predicted-13.png",
            "width": 267,
            "height": 266,
            "caption": [
              "Généré · frame 13",
              "Generated · frame 13"
            ],
            "alt": [
              "Généré · frame 13",
              "Generated · frame 13"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Évaluation du rollout (11–36)",
          "Evaluating the rollout (11–36)"
        ],
        "body": [
          "Sur un horizon autoregressif plus long, les différences entre vérité terrain et prédiction s'accumulent. Les deux mosaïques proviennent du dépôt du projet : la première montre des comparaisons avec des métriques annotées par frame, la seconde affiche des MSE par instant sur une séquence. Il ne s'agit pas d'une moyenne globale, ni d'une comparaison à protocole commun contre RAFT et ConvLSTM.",
          "At a longer autoregressive horizon, discrepancies between ground truth and prediction accumulate. Both mosaics come from the project repository: the first shows comparisons with per-frame annotations, the second shows per-frame MSE for one sequence. Neither is a global test-set aggregate or a controlled benchmark against RAFT and ConvLSTM."
        ],
        "media": [
          {
            "src": "images/flow/forecast-frames-11-36.png",
            "width": 4674,
            "height": 1772,
            "caption": [
              "Réel vs généré — frames 11–36 et scores affichés dans la figure",
              "Ground truth vs generated — frames 11–36 with annotations within the figure"
            ],
            "alt": [
              "Réel vs généré — frames 11–36 et scores affichés dans la figure",
              "Ground truth vs generated — frames 11–36 with annotations within the figure"
            ]
          },
          {
            "src": "images/flow/forecast-mse-grid.png",
            "width": 1664,
            "height": 173,
            "caption": [
              "Autre séquence : référence, prédiction et erreurs par frame",
              "Another sequence: ground truth, prediction and frame-level errors"
            ],
            "alt": [
              "Autre séquence : référence, prédiction et erreurs par frame",
              "Another sequence: ground truth, prediction and frame-level errors"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Méthodes alternatives et limites",
          "Alternative methods and limitations"
        ],
        "body": [
          "Approches examinées en équipe : RAFT avec déformation (warping) pour transporter les pixels existants ; ConvLSTM pour prédire des frames par mémoire spatio-temporelle ; VQGAN + Flow Matching pour générer de nouveaux latents. Dans la présentation, Flow Matching semblait le plus prometteur, mais la comparaison ne constitue pas un benchmark complet contrôlé et reste sensible au drift temporel.",
          "Approaches explored by the team: RAFT with warping to transport existing pixels; ConvLSTM for recurrent spatiotemporal frame prediction; VQGAN + Flow Matching to synthesise new latents. The presentation considered Flow Matching the most promising, but this was not a fully controlled benchmark and temporal drift remains a limitation."
        ],
        "media": [
          {
            "src": "images/flow/alternative-methods.svg",
            "width": 1400,
            "height": 620,
            "caption": [
              "Résumé des trois approches et de leurs limites — schéma de synthèse",
              "Summary of three methods and their limitations — explanatory chart"
            ],
            "alt": [
              "Résumé des trois approches et de leurs limites — schéma de synthèse",
              "Summary of three methods and their limitations — explanatory chart"
            ]
          }
        ],
        "blocks": []
      }
    ],
    "annex": [
      {
        "label": [
          "Présentation technique complète (synthèse web illustrée)",
          "Full technical walkthrough (illustrated web summary)"
        ],
        "href": "presentation-panaches.html"
      },
      {
        "label": [
          "Préparation des frames et matting",
          "Frame preparation and matting"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/prepare_data/prepare_dataset.py"
      },
      {
        "label": [
          "Échantillonnage, champ vectoriel et génération ODE",
          "Sampling, vector field and ODE generation"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/model/model.py"
      },
      {
        "label": [
          "Configuration 64 × 64 / latents 8 × 8",
          "64 × 64 / 8 × 8 latent configuration"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/configs/smoke_dataset_vqgan.yaml"
      },
      {
        "label": [
          "Documentation détaillée du pipeline",
          "Detailed pipeline documentation"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/doc/SMOKE_FLOW_MATCHING_PIPELINE.md"
      }
    ]
  },
  "mice": {
    "title": [
      "Suivi multi-souris en laboratoire",
      "Laboratory multi-mouse tracking"
    ],
    "intro": [
      "Stage L3i : adapter une méthode de détection de points anatomiques aux vidéos du laboratoire et conserver l’identité des souris.",
      "L3i internship: adapting anatomical keypoint detection to laboratory videos and maintaining mouse identities."
    ],
    "cover": {
      "src": "images/mice/mice-tracking.png",
      "width": 887,
      "height": 774,
      "caption": [
        "Deux souris suivies dans leur enclos",
        "Two mice tracked in their enclosure"
      ],
      "alt": [
        "Deux souris suivies dans leur enclos",
        "Two mice tracked in their enclosure"
      ]
    },
    "stats": [
      {
        "value": "MARS",
        "label": [
          "Données publiques + vidéos du labo",
          "Public data + laboratory video"
        ]
      },
      {
        "value": "7",
        "label": [
          "Points par souris",
          "Keypoints per mouse"
        ]
      },
      {
        "value": "PyQt5",
        "label": [
          "Interface d’analyse",
          "Analysis interface"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Données & adaptation",
          "Data & adaptation"
        ],
        "body": [
          "MARS fournit des images annotées avec sept points anatomiques. Des frames du laboratoire sont ensuite annotées et augmentées pour adapter le modèle aux conditions d’acquisition.",
          "MARS provides images annotated with seven anatomical keypoints. Laboratory frames are then annotated and augmented to adapt the model to the acquisition conditions."
        ],
        "media": [
          {
            "src": "images/mice/mice-dataset.png",
            "width": 454,
            "height": 239,
            "caption": [
              "Exemple du dataset MARS",
              "MARS dataset example"
            ],
            "alt": [
              "Exemple du dataset MARS",
              "MARS dataset example"
            ]
          },
          {
            "src": "images/mice/mice-annotation.png",
            "width": 748,
            "height": 742,
            "caption": [
              "Frame du laboratoire annotée",
              "Annotated laboratory frame"
            ],
            "alt": [
              "Frame du laboratoire annotée",
              "Annotated laboratory frame"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Détection initiale",
          "Initial detection"
        ],
        "body": [
          "Keypoint R-CNN, avec un backbone ResNet50-FPN, propose des boîtes et des points anatomiques. La sortie brute contient encore plusieurs détections pour une même souris.",
          "Keypoint R-CNN with a ResNet50-FPN backbone proposes boxes and anatomical keypoints. The raw output still contains multiple detections for the same mouse."
        ],
        "media": [
          {
            "src": "images/mice/mice-raw.png",
            "width": 839,
            "height": 965,
            "caption": [
              "Sortie brute",
              "Raw output"
            ],
            "alt": [
              "Sortie brute",
              "Raw output"
            ]
          }
        ],
        "blocks": [
          [
            "Image",
            "Image"
          ],
          [
            "ResNet50-FPN",
            "ResNet50-FPN"
          ],
          [
            "Propositions & ROI",
            "Proposals & ROI"
          ],
          [
            "Boîtes + 7 points",
            "Boxes + 7 keypoints"
          ]
        ]
      },
      {
        "title": [
          "Filtrer & sélectionner",
          "Filter & select"
        ],
        "body": [
          "La NMS supprime les boîtes redondantes. Le seuil de confiance et le nombre de points visibles servent ensuite à retenir une détection par souris.",
          "NMS removes redundant boxes. Confidence and visible keypoint counts then help select one detection per mouse."
        ],
        "media": [
          {
            "src": "images/mice/mice-filtered.png",
            "width": 839,
            "height": 1003,
            "caption": [
              "Après NMS et seuillage",
              "After NMS and thresholding"
            ],
            "alt": [
              "Après NMS et seuillage",
              "After NMS and thresholding"
            ]
          },
          {
            "src": "images/mice/mice-selected.png",
            "width": 839,
            "height": 835,
            "caption": [
              "Détection retenue",
              "Selected detection"
            ],
            "alt": [
              "Détection retenue",
              "Selected detection"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Corriger les poses",
          "Correcting poses"
        ],
        "body": [
          "Des contraintes sur la symétrie, les angles et la queue permettent de corriger les positions anatomiquement incohérentes.",
          "Constraints on symmetry, angles and the tail help correct anatomically inconsistent positions."
        ],
        "media": [
          {
            "src": "images/mice/mice-pose-before.png",
            "width": 398,
            "height": 403,
            "caption": [
              "Avant correction",
              "Before correction"
            ],
            "alt": [
              "Avant correction",
              "Before correction"
            ]
          },
          {
            "src": "images/mice/mice-pose-after.png",
            "width": 398,
            "height": 472,
            "caption": [
              "Après correction",
              "After correction"
            ],
            "alt": [
              "Après correction",
              "After correction"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Gérer la proximité",
          "Handling proximity"
        ],
        "body": [
          "Lorsque les souris sont proches, les points anatomiques et l’historique de suivi aident à séparer les individus et à maintenir leurs identités.",
          "When mice are close together, anatomical keypoints and tracking history help separate individuals and maintain their identities."
        ],
        "media": [
          {
            "src": "images/mice/mice-close-before.png",
            "width": 398,
            "height": 513,
            "caption": [
              "Détections superposées",
              "Overlapping detections"
            ],
            "alt": [
              "Détections superposées",
              "Overlapping detections"
            ]
          },
          {
            "src": "images/mice/mice-close-after.png",
            "width": 398,
            "height": 654,
            "caption": [
              "Deux individus identifiés",
              "Two identified individuals"
            ],
            "alt": [
              "Deux individus identifiés",
              "Two identified individuals"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Suivi & export",
          "Tracking & export"
        ],
        "body": [
          "L’assignation des identités et le filtrage temporel assurent la continuité du suivi. L’interface permet d’inspecter les trajectoires et d’exporter les coordonnées des points en XML ou CSV.",
          "Identity assignment and temporal filtering maintain tracking continuity. The interface supports trajectory inspection and exporting keypoint coordinates as XML or CSV."
        ],
        "media": [
          {
            "src": "images/mice/mice-tracking.png",
            "width": 887,
            "height": 774,
            "caption": [
              "Suivi avec identités et points anatomiques",
              "Tracking with identities and anatomical keypoints"
            ],
            "alt": [
              "Suivi avec identités et points anatomiques",
              "Tracking with identities and anatomical keypoints"
            ]
          }
        ],
        "blocks": []
      }
    ],
    "annex": [
      {
        "label": [
          "Boucle d’entraînement · annexe B",
          "Training loop · appendix B"
        ],
        "href": "documents/rapport-stage-l3i-suivi-souris-2025.pdf#page=38"
      },
      {
        "label": [
          "Chargement et augmentation · annexe C",
          "Data loading and augmentation · appendix C"
        ],
        "href": "documents/rapport-stage-l3i-suivi-souris-2025.pdf#page=39"
      },
      {
        "label": [
          "Filtre de Kalman · annexe D",
          "Kalman filter · appendix D"
        ],
        "href": "documents/rapport-stage-l3i-suivi-souris-2025.pdf#page=40"
      },
      {
        "label": [
          "Contraintes anatomiques",
          "Anatomical constraints"
        ],
        "href": "documents/rapport-stage-l3i-suivi-souris-2025.pdf#page=44"
      }
    ]
  },
  "process": {
    "title": [
      "Prédire l’événement suivant avec BERT",
      "Predicting the next event with BERT"
    ],
    "intro": [
      "Logs Moodle : analyse des données, préparation des séquences et fine-tuning de BERT pour une classification à 38 classes.",
      "Moodle logs: data analysis, sequence preparation and BERT fine-tuning for 38-class classification."
    ],
    "cover": {
      "src": "images/process/process-preprocessing.png",
      "width": 2048,
      "height": 1130,
      "caption": [
        "Préparation des séquences Moodle",
        "Preparing Moodle sequences"
      ],
      "alt": [
        "Préparation des séquences Moodle",
        "Preparing Moodle sequences"
      ]
    },
    "stats": [
      {
        "value": "30 688",
        "label": [
          "Événements",
          "Events"
        ]
      },
      {
        "value": "274",
        "label": [
          "Utilisateurs",
          "Users"
        ]
      },
      {
        "value": "38",
        "label": [
          "Types d’événements",
          "Event types"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Comprendre les logs",
          "Understanding the logs"
        ],
        "body": [
          "Le CSV contient UserID, Timestamp et StudentEvent. L’exploration montre une forte concentration des interactions sur quelques événements, dont la consultation des cours.",
          "The CSV contains UserID, Timestamp and StudentEvent. Exploration shows that interactions concentrate on a few events, including course views."
        ],
        "media": [
          {
            "src": "images/process/process-frequency.png",
            "width": 984,
            "height": 590,
            "caption": [
              "Fréquence des événements",
              "Event frequencies"
            ],
            "alt": [
              "Fréquence des événements",
              "Event frequencies"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Construire les séquences",
          "Building sequences"
        ],
        "body": [
          "Tri par utilisateur et horodatage, puis encodage des événements. On crée des paires historique / prochain événement et on masque le padding pour préserver le contexte utile.",
          "Sort by user and timestamp, then encode events. History / next-event pairs are created, with padding masked to retain useful context."
        ],
        "media": [
          {
            "src": "images/process/process-preprocessing.png",
            "width": 2048,
            "height": 1130,
            "caption": [
              "Des logs aux paires entrée / cible",
              "From logs to input / target pairs"
            ],
            "alt": [
              "Des logs aux paires entrée / cible",
              "From logs to input / target pairs"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Adapter BERT",
          "Adapting BERT"
        ],
        "body": [
          "BertForSequenceClassification reçoit la séquence et son masque d’attention. Une tête de classification prédit une probabilité pour chacun des 38 événements possibles.",
          "BertForSequenceClassification receives the sequence and its attention mask. A classification head predicts a probability for each of the 38 possible events."
        ],
        "media": [
          {
            "src": "images/process/process-bert.png",
            "width": 2048,
            "height": 901,
            "caption": [
              "Séquence, embeddings et prédiction",
              "Sequence, embeddings and prediction"
            ],
            "alt": [
              "Séquence, embeddings et prédiction",
              "Sequence, embeddings and prediction"
            ]
          }
        ],
        "blocks": [
          [
            "Séquence",
            "Sequence"
          ],
          [
            "Masque d’attention",
            "Attention mask"
          ],
          [
            "BERT",
            "BERT"
          ],
          [
            "38 classes",
            "38 classes"
          ]
        ]
      },
      {
        "title": [
          "Entraîner & évaluer",
          "Training & evaluation"
        ],
        "body": [
          "Fine-tuning avec AdamW, régularisation et Focal Loss pour les classes déséquilibrées ; réglage avec Optuna. Les pertes et les métriques par classe montrent aussi les difficultés sur les événements rares.",
          "Fine-tuning with AdamW, regularisation and Focal Loss for class imbalance, with Optuna tuning. Losses and per-class metrics also reveal difficulties with rare events."
        ],
        "media": [
          {
            "src": "images/process/process-loss.png",
            "width": 469,
            "height": 304,
            "caption": [
              "Pertes d’entraînement et de validation",
              "Training and validation losses"
            ],
            "alt": [
              "Pertes d’entraînement et de validation",
              "Training and validation losses"
            ]
          }
        ],
        "blocks": []
      }
    ],
    "annex": [
      {
        "label": [
          "Prétraitement et BERT · diaporama",
          "Preprocessing and BERT · slides"
        ],
        "href": "documents/presentation-process-mining-bert.pdf#page=2"
      },
      {
        "label": [
          "Données et BERT · extrait du rapport",
          "Data and BERT · report excerpt"
        ],
        "href": "documents/process-mining-donnees-bert.pdf"
      }
    ]
  },
  "face": {
    "title": [
      "Attributs faciaux : du CNN au service",
      "Facial attributes: from CNN to service"
    ],
    "intro": [
      "Un modèle multi-têtes et un pipeline pour préparer, entraîner, suivre, orchestrer et servir les prédictions.",
      "A multi-head model and a pipeline for preparation, training, tracking, orchestration and serving predictions."
    ],
    "cover": {
      "src": "images/face/face-architecture.png",
      "width": 1289,
      "height": 606,
      "caption": [
        "Architecture du CNN multi-têtes",
        "Multi-head CNN architecture"
      ],
      "alt": [
        "Architecture du CNN multi-têtes",
        "Multi-head CNN architecture"
      ]
    },
    "stats": [
      {
        "value": "≈ 15 890",
        "label": [
          "Images",
          "Images"
        ]
      },
      {
        "value": "5",
        "label": [
          "Attributs prédits",
          "Predicted attributes"
        ]
      },
      {
        "value": "3 + 2",
        "label": [
          "Tâches binaires + multiclasses",
          "Binary + multiclass tasks"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Préparer les données",
          "Preparing data"
        ],
        "body": [
          "Les images alimentent cinq tâches : barbe, moustache, lunettes, longueur et couleur des cheveux. DVC suit les données et les étapes de préparation.",
          "Images support five tasks: beard, moustache, glasses, hair length and hair colour. DVC tracks data and preparation stages."
        ],
        "media": [],
        "blocks": [
          [
            "Images",
            "Images"
          ],
          [
            "Prétraitement",
            "Preprocessing"
          ],
          [
            "DVC",
            "DVC"
          ],
          [
            "Train / validation",
            "Train / validation"
          ]
        ]
      },
      {
        "title": [
          "Partager les features",
          "Sharing features"
        ],
        "body": [
          "Un backbone convolutif extrait les caractéristiques communes. Cinq têtes spécialisées produisent les prédictions binaires ou multiclasses.",
          "A convolutional backbone extracts shared features. Five specialised heads produce binary or multiclass predictions."
        ],
        "media": [
          {
            "src": "images/face/face-architecture.png",
            "width": 1289,
            "height": 606,
            "caption": [
              "Backbone partagé et cinq têtes",
              "Shared backbone and five heads"
            ],
            "alt": [
              "Backbone partagé et cinq têtes",
              "Shared backbone and five heads"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Entraîner le modèle",
          "Training the model"
        ],
        "body": [
          "Entraînement multi-tâches avec AdamW, early stopping et scheduler. Hyperopt explore les hyperparamètres ; l’évaluation reste séparée pour chaque attribut.",
          "Multi-task training uses AdamW, early stopping and a scheduler. Hyperopt explores hyperparameters; evaluation remains separate for each attribute."
        ],
        "media": [
          {
            "src": "images/face/face-training.png",
            "width": 965,
            "height": 547,
            "caption": [
              "Boucle d’entraînement multi-tâches",
              "Multi-task training loop"
            ],
            "alt": [
              "Boucle d’entraînement multi-tâches",
              "Multi-task training loop"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Suivre les expériences",
          "Tracking experiments"
        ],
        "body": [
          "MLflow centralise les paramètres, les courbes et les versions des modèles pour comparer les essais.",
          "MLflow centralises parameters, curves and model versions to compare experiments."
        ],
        "media": [
          {
            "src": "images/face/face-mlflow.png",
            "width": 1863,
            "height": 921,
            "caption": [
              "Exemple de run MLflow",
              "Example MLflow run"
            ],
            "alt": [
              "Exemple de run MLflow",
              "Example MLflow run"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Orchestrer le pipeline",
          "Orchestrating the pipeline"
        ],
        "body": [
          "DVC décrit les dépendances entre préparation, recherche d’hyperparamètres, entraînement et évaluation. Airflow orchestre l’exécution et les notifications.",
          "DVC describes dependencies between preparation, hyperparameter search, training and evaluation. Airflow orchestrates execution and notifications."
        ],
        "media": [
          {
            "src": "images/face/face-dvc.png",
            "width": 1220,
            "height": 559,
            "caption": [
              "Pipeline automatisé avec DVC",
              "Automated DVC pipeline"
            ],
            "alt": [
              "Pipeline automatisé avec DVC",
              "Automated DVC pipeline"
            ]
          }
        ],
        "blocks": []
      },
      {
        "title": [
          "Servir les prédictions",
          "Serving predictions"
        ],
        "body": [
          "Le service FastAPI et l’application sont conteneurisés avec Docker. L’interface donne accès aux attributs prédits et aux filtres.",
          "The FastAPI service and application are containerised with Docker. The interface exposes predicted attributes and filters."
        ],
        "media": [
          {
            "src": "images/face/face-app.png",
            "width": 1280,
            "height": 672,
            "caption": [
              "Interface de l’application",
              "Application interface"
            ],
            "alt": [
              "Interface de l’application",
              "Application interface"
            ]
          }
        ],
        "blocks": []
      }
    ],
    "annex": [
      {
        "label": [
          "Architecture · slide 4",
          "Architecture · slide 4"
        ],
        "href": "documents/presentation-attributs-faciaux-mlops.pdf#page=4"
      },
      {
        "label": [
          "DVC et orchestration · slides 9–10",
          "DVC and orchestration · slides 9–10"
        ],
        "href": "documents/presentation-attributs-faciaux-mlops.pdf#page=9"
      },
      {
        "label": [
          "CI et Docker · slides 11–12",
          "CI and Docker · slides 11–12"
        ],
        "href": "documents/presentation-attributs-faciaux-mlops.pdf#page=11"
      }
    ]
  },
  "loan": {
    "title": [
      "Gestion de prêts : architecture backend",
      "Loan management: backend architecture"
    ],
    "intro": [
      "Projet de groupe. Ma contribution : API et backend, routes, services et mails de notification.",
      "Group project. My contribution: API and backend, routes, services and notification emails."
    ],
    "stats": [
      {
        "value": "Spring Boot",
        "label": [
          "API et services",
          "API and services"
        ]
      },
      {
        "value": "PostgreSQL",
        "label": [
          "Persistance",
          "Persistence"
        ]
      },
      {
        "value": "JWT",
        "label": [
          "Authentification",
          "Authentication"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Séparer les couches",
          "Separating layers"
        ],
        "body": [
          "Les contrôleurs reçoivent les requêtes REST, les services appliquent la logique métier et les repositories gèrent la persistance.",
          "Controllers receive REST requests, services apply business logic and repositories handle persistence."
        ],
        "media": [],
        "blocks": [
          [
            "API REST",
            "REST API"
          ],
          [
            "Controllers",
            "Controllers"
          ],
          [
            "Services",
            "Services"
          ],
          [
            "Repositories",
            "Repositories"
          ],
          [
            "PostgreSQL",
            "PostgreSQL"
          ]
        ]
      },
      {
        "title": [
          "Modéliser les prêts",
          "Modelling loans"
        ],
        "body": [
          "Les prêts relient les utilisateurs et les matériels. Les modèles de matériel, départements et statuts structurent les opérations et les règles de gestion.",
          "Loans link users and equipment. Equipment models, departments and statuses structure operations and business rules."
        ],
        "media": [],
        "blocks": [
          [
            "Utilisateur",
            "User"
          ],
          [
            "Prêt",
            "Loan"
          ],
          [
            "Matériel",
            "Equipment"
          ],
          [
            "Modèle & statut",
            "Model & status"
          ]
        ]
      },
      {
        "title": [
          "Sécuriser les opérations",
          "Securing operations"
        ],
        "body": [
          "JWT porte l’authentification ; les rôles distinguent les opérations d’administration des actions des étudiants. Les services déclenchent aussi les mails de notification.",
          "JWT supports authentication; roles separate administration operations from student actions. Services also trigger notification emails."
        ],
        "media": [],
        "blocks": [
          [
            "JWT",
            "JWT"
          ],
          [
            "Rôles",
            "Roles"
          ],
          [
            "Routes protégées",
            "Protected routes"
          ],
          [
            "Notifications",
            "Notifications"
          ]
        ]
      },
      {
        "title": [
          "Assembler l’application",
          "Assembling the application"
        ],
        "body": [
          "L’interface React échange avec l’API Spring Boot. Docker Compose réunit le frontend, le backend, PostgreSQL et l’outil d’administration de la base.",
          "The React interface communicates with the Spring Boot API. Docker Compose brings together the frontend, backend, PostgreSQL and database administration tool."
        ],
        "media": [],
        "blocks": [
          [
            "React",
            "React"
          ],
          [
            "Spring Boot",
            "Spring Boot"
          ],
          [
            "PostgreSQL",
            "PostgreSQL"
          ],
          [
            "Docker Compose",
            "Docker Compose"
          ]
        ]
      }
    ],
    "annex": [
      {
        "label": [
          "Schéma backend fourni",
          "Supplied backend diagram"
        ],
        "href": "images/loan/backend-source.jpeg"
      }
    ]
  },
  "multi-object-tracking": {
    "title": [
      "Suivi multi-objets : méthode et résultat illustré",
      "Multi-object tracking: method and illustrated output"
    ],
    "intro": [
      "Projet de master de vision classique. Trois étapes pour comprendre le pipeline décrit dans la présentation, puis lire son résultat sans confondre illustration et évaluation.",
      "A classical computer-vision master’s project. Three steps explain the pipeline described in the slides and distinguish an illustrated output from an evaluation."
    ],
    "cover": {
      "src": "images/multi-object-tracking/tracking-result.jpeg",
      "width": 1335,
      "height": 386,
      "caption": [
        "Image extraite de la page 11 : boîtes et identifiants affichés. Exemple qualitatif, sans mesure de performance.",
        "Image extracted from page 11: displayed boxes and IDs. Qualitative example, without performance measurements."
      ],
      "alt": [
        "Image de sortie du projet de master montrant plusieurs objets encadrés en bleu avec des identifiants, et des boîtes superposées.",
        "Master’s project output showing multiple objects with blue bounding boxes and IDs, including overlapping boxes."
      ]
    },
    "stats": [
      {
        "value": "Médiane + EMA",
        "label": [
          "Estimation du fond",
          "Background estimation"
        ]
      },
      {
        "value": "Kalman + Hungarian",
        "label": [
          "Prédiction et association",
          "Prediction and assignment"
        ]
      },
      {
        "value": "PDF · 13 pages",
        "label": [
          "Ressource disponible",
          "Available resource"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Fond adaptatif & détection",
          "Adaptive background & detection"
        ],
        "body": [
          "Initialiser le fond par la médiane des premières images, puis le mettre à jour par moyenne exponentielle sur les pixels autorisés. Les masques de mouvement et de détections externes limitent l’intégration des objets au fond.",
          "Initialise the background with the median of the first frames, then update eligible pixels with an exponential moving average. Motion and external-detection masks limit the incorporation of objects into the background."
        ],
        "blocks": [
          [
            "Médiane initiale",
            "Initial median"
          ],
          [
            "Mise à jour EMA masquée",
            "Masked EMA update"
          ],
          [
            "Différence & seuillage",
            "Difference & threshold"
          ],
          [
            "Morphologie & boîtes",
            "Morphology & boxes"
          ]
        ],
        "media": []
      },
      {
        "title": [
          "Prédiction & association",
          "Prediction & assignment"
        ],
        "body": [
          "À chaque image, prédire les pistes avec Kalman, extraire les détections, calculer le coût apparence / IoU, puis effectuer l’association hongroise et corriger les états. Conserver temporairement les pistes non associées pour gérer les pertes de détection.",
          "For each frame, predict tracks with Kalman, extract detections, calculate the appearance / IoU cost, perform Hungarian assignment and correct states. Retain unmatched tracks temporarily to handle missed detections."
        ],
        "blocks": [
          [
            "Prédire",
            "Predict"
          ],
          [
            "Détecter",
            "Detect"
          ],
          [
            "Associer",
            "Assign"
          ],
          [
            "Corriger",
            "Update"
          ]
        ],
        "media": []
      },
      {
        "title": [
          "Résultat illustré & limites",
          "Illustrated output & limitations"
        ],
        "body": [
          "La présentation conserve cette image avec boîtes et identifiants. Elle illustre la sortie du pipeline, mais ne permet pas de mesurer la continuité des identités. Un objet immobile peut être absorbé dans le fond pendant l’initialisation ; des boîtes proches ou superposées restent visibles. Ressources disponibles : la présentation et cet exemple statique, sans code, vidéo complète ni benchmark chiffré.",
          "The slides retain this image with boxes and IDs. It illustrates the pipeline output but cannot measure identity continuity. A stationary object can be absorbed into the background during initialisation; nearby or overlapping boxes remain visible. Available resources are the slides and this static example, without code, the full video or a quantitative benchmark."
        ],
        "blocks": [],
        "media": [
          {
            "src": "images/multi-object-tracking/tracking-result.jpeg",
            "width": 1335,
            "height": 386,
            "caption": [
              "Image extraite de la page 11 : boîtes et identifiants affichés. Exemple qualitatif, sans mesure de performance.",
              "Image extracted from page 11: displayed boxes and IDs. Qualitative example, without performance measurements."
            ],
            "alt": [
              "Image de sortie du projet de master montrant plusieurs objets encadrés en bleu avec des identifiants, et des boîtes superposées.",
              "Master’s project output showing multiple objects with blue bounding boxes and IDs, including overlapping boxes."
            ]
          }
        ]
      }
    ],
    "annex": [
      {
        "label": [
          "Présentation complète · 13 pages",
          "Full presentation · 13 pages"
        ],
        "href": "documents/presentation-master-multi-object-tracking.pdf"
      },
      {
        "label": [
          "Résultat illustré · page 11",
          "Illustrated output · page 11"
        ],
        "href": "documents/presentation-master-multi-object-tracking.pdf#page=11"
      }
    ]
  }
};
