// 玩家数据 - 你可以直接在这里添加、修改或删除玩家信息
const players = [
    { id: 1, name: "DragonSlayer", uuid: "069a79f4-44e9-4726-a5be-feca3e17a67d", region: "nc", tier: "ht1", ping: 28 },
    { id: 2, name: "ShadowStrike", uuid: "a85e5958-8d95-4bed-9e8e-35f5d14989c6", region: "ec", tier: "lt1", ping: 32 },
    { id: 3, name: "PhantomBlade", uuid: "f999b663-4172-4209-8a73-24a1b21b90b9", region: "sc", tier: "ht2", ping: 45 },
    { id: 4, name: "InvalidUUIDTest", uuid: "invalid-uuid-1234", region: "ws", tier: "lt2", ping: 51 },
    { id: 5, name: "NightFalcon", uuid: "a124953c-0097-464c-813d-6c73b7f36d8e", region: "wn", tier: "ht3", ping: 39 },
    { id: 6, name: "AnotherInvalid", uuid: "12345678-1234-5678-1234-567812345678", region: "en", tier: "lt3", ping: 47 },
    { id: 7, name: "SwiftArrow", uuid: "9f9c3a3b-7d2b-4f8d-8e1c-7b6d5e4c3b2a", region: "nc", tier: "ht4", ping: 33 },
    { id: 8, name: "StealthNinja", uuid: "2d4e6f8a-1c3b-5e7f-9a0b-2c4d6e8f0a1b", region: "ec", tier: "lt4", ping: 41 },
    { id: 9, name: "FireBreath", uuid: "8c6a4b2d-0e1f-3g5h-7j9k-1m2n3o4p5q6r", region: "sc", tier: "ht5", ping: 53 },
    { id: 10, name: "FrostBite", uuid: "5e7d9c3a-1b2f-4h6j-8l0k-2m4n6p8q0r1s", region: "ws", tier: "lt5", ping: 49 }
];

// 保存到本地存储
localStorage.setItem('playersData', JSON.stringify(players));
    