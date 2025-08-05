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
    "ping": 95
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
  },
  {
    "id": 7,
    "name": " mojo_xiaoyun",
    "uuid": "031aa24859514a77b8b5c58e9df652a0",
    "region": "en",
    "tier": "ht5",
    "ping": 106
  },
  {
    "id": 8,
    "name": " BloozingXD",
    "uuid": "a86e09e0e23b419292ebce363fd160db",
    "region": "ec",
    "tier": "lt3",
    "ping": 102
  },
  {
    "id": 9,
    "name": " Khp3r1",
    "uuid": "d372e8d7e7e04c6c889b0078e19a0627",
    "region": "ws",
    "tier": "lt5",
    "ping": 82
  }
];

if (typeof window !== 'undefined') {
    try {
        const encoded = btoa(JSON.stringify(players));
        window.__pd = encoded;
    } catch (e) {
        console.error('数据处理失败');
    }
}
    
