window.portfolioStudies={
  "flow": {
    "title": [
      "Modéliser les panaches de fumée",
      "Modelling smoke plumes"
    ],
    "intro": [
      "Des clips industriels à la génération de frames : mon travail sur VQGAN et Flow Matching dans un projet de groupe.",
      "From industrial clips to frame generation: my work on VQGAN and Flow Matching in a group project."
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
          "Données",
          "Data"
        ],
        "body": [
          "Sélection de clips annotés de fumée industrielle issus de Project RISE. Les vidéos servent à préparer des séquences et des ensembles d’entraînement, de validation et de test.",
          "Selected annotated industrial smoke clips from Project RISE. Videos are used to prepare sequences and training, validation and test sets."
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
          "Extraction des frames, estimation du fond puis matting : l’objectif est de séparer le panache du décor fixe avant l’apprentissage.",
          "Frame extraction, background estimation and matting separate the plume from the static scene before training."
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
          "Le modèle compresse les images en latents puis apprend à les reconstruire. L’exemple montre ce que la représentation conserve et les détails qui se perdent.",
          "The model compresses images into latents and learns to reconstruct them. This example shows what the representation retains and which details are lost."
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
          "À l’entraînement, une frame cible, sa référence précédente et un contexte antérieur sont échantillonnés dans la séquence. Flow Matching apprend le champ de vitesses dans l’espace latent ; une ODE permet ensuite de générer les latents futurs.",
          "Training samples a target frame, its preceding reference and an earlier context from a sequence. Flow Matching learns a velocity field in latent space; an ODE then generates future latents."
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
          "Comparer les sorties",
          "Comparing outputs"
        ],
        "body": [
          "Les latents sont décodés en images puis comparés aux frames réelles. Ici, les panaches restent reconnaissables, avec des écarts de forme et de texture : l’inspection visuelle complète PSNR, SSIM et FVD.",
          "Latents are decoded into images and compared with real frames. Plumes remain recognisable here, with differences in shape and texture: visual inspection complements PSNR, SSIM and FVD."
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
      }
    ],
    "annex": [
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
  }
};
