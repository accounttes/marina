const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  credentials: true
}));

app.use(express.json());

app.post('/api/post_authorization', (req, res) => {
  const { identifier, password } = req.body.data;
  
  if (identifier && password) {
    res.setHeader('Authorization', 'Bearer mock-token-12345');
    res.json({
      meta: {
        cmd: "authorization",
        session_id: "6280bee6-564f-46b3-bfed-711698c1b924"
      },
      data: {
        user: {
          id: 1,
          nickname: identifier,
          email: `${identifier}@example.com`,
          role: "user"
        },
        token: "mock-token-12345"
      }
    });
  } else {
    res.status(401).json({
      meta: {
        cmd: "authorization",
        error: "Invalid credentials"
      }
    });
  }
});

app.post('/api/show_profile_me', (req, res) => {
  console.log('Received request:', req.body);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin');
  
  res.json({
    "success": true,
    "data": {
      "page": {
        "image": "https://s3.twcstorage.ru/b90dcef9-3a3d4aa5-390c-43f7-8b10-e5e0bbf5eccf/images/profile/avatars/default/new/13.png",
        "title": "Дамир",
        "subtitle": null,
        "left": [
          {
            "button": {
              "name": "",
              "cmd": "show_back",
              "icon": "todo.svg"
            }
          }
        ],
        "middle": [
          {
            "group": [
              {
                "label": {
                  "text": "damirdamir"
                }
              },
              {
                "label": {
                  "text": "16 мая"
                }
              }
            ]
          },
          {
            "group": [
              {
                "label": {
                  "text": "18 дней"
                }
              },
              {
                "label": {
                  "text": "4"
                }
              },
              {
                "label": {
                  "text": "0"
                }
              }
            ]
          },
          {
            "group": [
              {
                "label": {
                  "text": "Краснодар"
                }
              },
              {
                "label": {
                  "text": "РУМИТЬ"
                }
              }
            ]
          }
        ],
        "right": [
          {
            "button": {
              "name": "",
              "cmd": "make_share",
              "icon": "todo.svg"
            }
          }
        ]
      }
    },
    "meta": {
      "session_id": "71ba015c-c741-4c71-944a-93d931e5a965",
      "cmd": "show_profile"
    }
  });
});

app.options('*', cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
}); 