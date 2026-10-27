window.portfolioStudies={
  "flow": {
    "title": [
      "Industrial Plume Forecasting",
      "Industrial Plume Forecasting"
    ],
    "intro": [
      "Prévision vidéo de fumée : CLIPSeg, VQGAN et Flow Matching, avec protocole reproductible, références comparables et suivi des erreurs.",
      "Smoke video forecasting with CLIPSeg, VQGAN and Flow Matching, a reproducible protocol, comparable baselines and error diagnostics."
    ],
    "cover": {
      "src": "images/flow/dataset-frame.png",
      "alt": [
        "Image source d’un clip industriel RISE.",
        "Source frame from an industrial RISE clip."
      ],
      "width": 1280,
      "height": 720
    },
    "stats": [
      {
        "value": "36",
        "label": [
          "Images par clip",
          "Frames per clip"
        ]
      },
      {
        "value": "5 → 15",
        "label": [
          "Observations → prévisions",
          "Observations → predictions"
        ]
      },
      {
        "value": "5",
        "label": [
          "Méthodes comparées",
          "Comparison methods"
        ]
      }
    ],
    "steps": [
      {
        "title": [
          "Une tâche de prévision définie",
          "A defined forecasting task"
        ],
        "body": [
          "Chaque clip conserve 36 images consécutives. Cinq observations servent à prévoir quinze images ; les images futures réelles sont réservées aux pertes et à la mesure, jamais à l’entrée de génération.",
          "Each clip retains 36 consecutive frames. Five observations support fifteen predictions; true future frames are used for losses and measurement, never as generation input."
        ],
        "media": [
          {
            "type": "image",
            "src": "images/flow/plume-forecasting-pipeline.svg",
            "caption": [
              "Architecture du protocole implémenté ; aucun résultat de prévision représenté.",
              "Implemented protocol architecture; this diagram depicts no forecasting result."
            ],
            "alt": [
              "Chaîne RISE, CLIPSeg, NPZ, VQGAN, modèles comparés et tests réservés.",
              "RISE, CLIPSeg, NPZ, VQGAN, comparison methods and held-out tests."
            ],
            "width": 1200,
            "height": 500,
            "wide": true
          }
        ]
      },
      {
        "title": [
          "Extraction causale et traçable",
          "Causal, traceable extraction"
        ],
        "body": [
          "CLIPSeg traite chaque image indépendamment, suivi d’un filtre guidé spatial. Les masques sont des estimations sémantiques, sans opacité physique ni vérité terrain dense revendiquée.",
          "CLIPSeg processes each frame independently, followed by a spatial guided filter. Masks are semantic estimates, with no claim of physical opacity or independent dense ground truth."
        ],
        "blocks": [
          [
            "RISE : clips de 36 acquisitions, RGB 64 × 64 et masques souples. Les partitions sont séparées par dates et vues ; les identifiants et empreintes sont conservés.",
            "RISE: 36-acquisition clips, 64 × 64 RGB and soft masks. Splits separate dates and views; identifiers and checksums are retained."
          ],
          [
            "Les manifests conservent dates, caméras, vues, indices, temps et empreintes. Les contrôles automatiques lisent les tableaux et détectent masques invalides, clips manquants et chevauchements.",
            "Manifests retain dates, cameras, views, indices, timestamps and checksums. Automatic checks read the arrays and detect invalid masks, missing clips and partition overlap."
          ]
        ],
        "media": []
      },
      {
        "title": [
          "Représentation et modèles",
          "Representation and models"
        ],
        "body": [
          "VQGAN commun : latents 8 × 8 × 256 et 1 024 codes. Flow Matching uniforme et pondéré par alpha sont comparés à la persistance, au flot optique de Farnebäck et à un SimVP compact.",
          "Common VQGAN: 8 × 8 × 256 latents and 1,024 codes. Uniform and alpha-weighted Flow Matching are compared with persistence, Farnebäck optical flow and compact SimVP."
        ],
        "blocks": [
          [
            "Évaluation de cinq observations vers quinze futurs ; trois graines de prédicteurs, quatre réalisations par prévision stochastique et moyenne de toutes les réalisations. La LPIPS de validation sélectionne le checkpoint.",
            "Five observed frames to fifteen future frames; three predictor seeds, four realizations per stochastic forecast and averaging over every realization. Validation LPIPS selects the checkpoint."
          ],
          [
            "Les cibles d’apprentissage RIVER sont tirées dans le clip complet avec une référence précédente et une condition antérieure. Le scénario 5 → 15 est la tâche d’évaluation.",
            "RIVER training targets are sampled across the full clip with a preceding reference and an earlier condition. The 5 → 15 scenario defines evaluation."
          ]
        ],
        "media": []
      },
      {
        "title": [
          "Monitoring et reprise",
          "Monitoring and recovery"
        ],
        "body": [
          "Panels train / validation fixes, erreurs fumée et fond, résultats par date et vue, utilisation du codebook, gradients, temps et mémoire. Les courbes précisent leur sens et leurs limites.",
          "Fixed training / validation panels, smoke and background errors, date/view slices, codebook usage, gradients, time and memory. Charts document their meaning and limits."
        ],
        "blocks": [
          [
            "Écriture atomique des checkpoints, conservation des deux derniers états et du meilleur modèle, sauvegarde des RNG et contrôle de provenance. Les NPZ finalisés restent réutilisables sans les MP4 sources.",
            "Atomic checkpoint writes, retention of the two latest recovery states and the best model, RNG capture and provenance checks. Finalized NPZ data remain usable after source MP4 removal."
          ],
          [
            "Les hyperparamètres VQGAN et prédicteurs sont déclarés séparément. Une comparaison de LR peut être préenregistrée ; une valeur dans un YAML ne prouve pas son optimalité.",
            "VQGAN and predictor hyperparameters are declared separately. An LR comparison can be preregistered; a value in a YAML file does not demonstrate optimality."
          ]
        ],
        "media": []
      },
      {
        "title": [
          "Évaluer sans surinterpréter",
          "Evaluate without overclaiming"
        ],
        "body": [
          "Le code, le protocole, les tests et la matrice sont publiés. Aucun gain prédictif consolidé ni meilleur LR calibré n’est revendiqué ; les essais comparables doivent produire ces preuves.",
          "Code, protocol, tests and the experiment matrix are published. No consolidated forecasting improvement or calibrated optimal LR is claimed; controlled runs must provide that evidence."
        ],
        "blocks": [
          [
            "Les tests réservés distinguent dates futures et vues inédites, avec différences appariées et bootstrap par journée. Une reconstruction VQGAN réussie ou un faible LPIPS ne suffisent pas à démontrer une prévision fidèle.",
            "Held-out tests distinguish future dates and unseen views, with paired differences and day-clustered bootstrap. Good VQGAN reconstruction or low LPIPS alone does not establish faithful forecasting."
          ],
          [
            "Masques CLIPSeg estimés, une seule initialisation VQGAN et peu de journées de validation limitent les conclusions. La portée est la prévision visuelle 2D, pas la mesure d’émissions ou de concentration.",
            "Estimated CLIPSeg masks, one VQGAN initialization and limited validation days constrain conclusions. Scope is 2D visual forecasting, not emissions or concentration measurement."
          ]
        ],
        "media": []
      }
    ],
    "annex": [
      {
        "label": [
          "Protocole",
          "Protocol"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/doc/SCIENTIFIC_PROTOCOL.md"
      },
      {
        "label": [
          "Architecture",
          "Architecture"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/doc/ARCHITECTURE.md"
      },
      {
        "label": [
          "Apprentissage et courbes",
          "Training and chart guide"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/doc/TRAINING_DESIGN.md"
      },
      {
        "label": [
          "Guide d’exécution",
          "Execution guide"
        ],
        "href": "https://github.com/omdrift/Modelisation-panaches-de-fum-es-industrielles-par-Flow-Matching/blob/main/doc/SCIENTIFIC_RUNBOOK.md"
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
