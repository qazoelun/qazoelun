// 玩家数据 - 你可以直接在这里添加、修改或删除玩家信息
const players = [
  {
    "id": 1,
    "name": "4w65756",
    "uuid": "bc343eb5-64d7-470a-ad2c-3a42fde1e235",
    "region": "nc",
    "tier": "ht1",
    "ping": 63
  },
  {
    "id": 2,
    "name": "cviaP",
    "uuid": "dd754083-74dd-422f-abfd-0332a43f8a87",
    "region": "sc",
    "tier": "ht2",
    "ping": 71
  },
  {
    "id": 3,
    "name": "GuardianSir_",
    "uuid": "342e8bee-2657-4ba8-8445-9baee7fda067",
    "region": "en",
    "tier": "lt2",
    "ping": 112
  },
  {
    "id": 4,
    "name": "Pigeon_Tuan",
    "uuid": "9df71575-b9a1-4c24-a9a2-8544d158d999",
    "region": "wn",
    "tier": "ht3",
    "ping": 74
  },
  {
    "id": 5,
    "name": " nekonyasun",
    "uuid": "78555048-dac8-415d-b6e1-738169036e93",
    "region": "nc",
    "tier": "ht3",
    "ping": 65
  },
{
    "id": 6,
    "name": " _just_raining_",
    "uuid": "2140249d84674ebfb2317df94be844c5",
    "region": "en",
    "tier": "lt3",
    "ping": 81
  }
];

// 保存到本地存储
localStorage.setItem('playersData', JSON.stringify(players));
    