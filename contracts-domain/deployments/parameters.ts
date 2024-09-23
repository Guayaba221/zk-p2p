import "module-alias/register";
import { BigNumber } from "ethers";
import { ONE_DAY_IN_SECONDS, THREE_MINUTES_IN_SECONDS, ZERO } from "@utils/constants";
import { ether, usdc } from "@utils/common/units";

// Deployment Parameters

// Global Parameters
export const MULTI_SIG: any = {
  "localhost": "",
  "sepolia": "",
  "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
  "base_staging": "0x84e113087C97Cd80eA9D78983D4B8Ff61ECa1929",
};

export const FEE_RECIPIENT: any = {
  "localhost": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "sepolia": "0x84e113087C97Cd80eA9D78983D4B8Ff61ECa1929",
  "base": "0x0bC26FF515411396DD588Abd6Ef6846E04470227",
  "base_staging": "0x84e113087C97Cd80eA9D78983D4B8Ff61ECa1929",
};

export const FEE_PERCENTAGE: any = {
  "localhost": ether(0.02),   // 2%
  "sepolia": ether(0.02),    // 2%
  "base": ether(0.02),       // 2%
  "base_staging": ether(0.02), // 2%
};

export const BID_SETTLEMENT_PERIOD: any = {
  "localhost": ONE_DAY_IN_SECONDS,
  "sepolia": THREE_MINUTES_IN_SECONDS,    // 3 minutes
  "base": THREE_MINUTES_IN_SECONDS.mul(BigNumber.from(10)),   // 30 minutes
  "base_staging": ONE_DAY_IN_SECONDS,
};

export const BID_REFUND_PERIOD: any = {
  "localhost": ONE_DAY_IN_SECONDS,
  "sepolia": THREE_MINUTES_IN_SECONDS,    // 3 minutes  
  "base": THREE_MINUTES_IN_SECONDS.mul(BigNumber.from(10)),   // 30 minutes
  "base_staging": ONE_DAY_IN_SECONDS,
};

export const VERIFY_DOMAIN_PROVIDER_HASHES: any = [
  '0xfd4622039be3e4286dd3285d36d772a71d580a9afa0a1718a7e643539c952cf9',   // 0
  '0x90a6489eff38140689a15133fb58906a7e847cc18271af036936c8eda91ddcc8',   // 1
  '0x14d26d02b3ae9f26f9e62a4d8d76ebfff0cd4a4d4629c08c909af99ec0eb41d7',   // 2
  '0x64558b4363c4f8d4e7c1ee1a75e4d82f8fa76640e174b06d4ed34e3b46ebc1a7',   // 3
  '0xe4ac93cf32a585897b300eec0d22fddaed70165948f7aafd1c44364805813057',   // 4
  '0x4a266fd63f550db6b79172325f33419df6d5d87bf924b175d8b1817f010a21cf',   // 5
  '0xdc0e66724fcf38e8519c7ab33ab9e6a047c758db35204b1d086500fe50333f71',   // 6
  '0x515a82e3326b985ca073d58a3ba9290e84ff8d021d072e7b420fd0616bc609e7',   // 7
  '0xb41a513fdd3e2b7a6b8e0c02f8a714aa3aca101cd32365de6cbac90fae308e06',   // 8
  '0x1fdc4738b323d4c38bf657a33f74f95618bc11933fcc4ce6e9f3f7c93f5a492e',   // 9
  '0x5f15231e57a2fa86f5e1eb1c2abdbd5485109ada65bb63bed87c72425dca8285',   // 10
  '0x5459ebbea646d1a4a0c93944e68600c9e355918a90b36d352a1291ba557e556c',   // 11
  '0xff66c7ec1f7c81fc833bafb9522cc15be4ef56462267c89879510501c1bc77fd',   // 12
  '0x5faa515009ca792805bdf03d951d753ab241c321066e3f0cbc0ee8f4c09ecb32',   // 13
  '0x804818b286e6c204b3f18282b1f7a0a40b1b555bc39dcf256342e0b4dc3f2992',   // 14
  '0x5ff169334a81b8b98ba9e7beb1ef2e3860f79f148cf07526524e829ecf6d6e5d',   // 15
  '0x38989329e5ced5859e6509da39f11f6344c10522c0193c0cb573e783e974fbd0',   // 16
  '0xac441d6d1e9962eb0abcbc819231e48614786c179507fd0faaec4cad0b5d1e0b',   // 17
  '0xe62e6329abefdee24fcecf37ca55b112fa9d0abacb2c99cd7f8c0da6c7ba46a8',   // 18
  '0x099b6726de138236fa7d3917f17caef42ebd19fa93de96b1b1faffc713265d30',   // 19
  // '0xde1e37cbb28770a1b1ed70d4a6837e0ee727926069ee8fa1633f03e4de2c35cd',
  // '0x6c0e0b23424d75c6191209487a27bdcb9ee9f748ec05f872b4afd56af66c36c5',
  // '0x9f76a244b731d7257d4cc846f3da987a6203862a32abe5d379785dbecd235d1a',
  // '0xef63eb7d0da5808077af6a8e9c160416ca66db16779ef30e4949d31edd70bf09',
  // '0x2b5db07f588bd27d3795281c640fd5ffe6de1114503a27e510a4aa4bd9d004d4',
  // '0x7189940070b05a712fc63053e9c7718770c562cd7df084e50a941669f680090a',
  // '0x1657faac94dd55e063362ddfb6f95c5a6d21e79ff758c6a8d6079510b004be32',
  // '0x60a18f9b8af405dcb90b51e6719fc14b7c7927a5961444cd97eb8ecffc7ecbd9',
  // '0x040fbe68e91a4575ad91d7dcb90077fcfc17627ef2a1293f59d1772959ccaed7',
  // '0xe2f19f3c91d9a590cfaf25f46551b4a0239ab452ef5f638ab172ccfbd0a0c617',
  // '0x70a8c0b560b4655c3a7c68c0bb76cf9fc42484a3bb73c5fed02a5fb4297965b6',
  // '0x56c812dccd84620292a18a829158ba20fef49e52efa5794c58d7d2780148fc23',
  // '0x72ab702376864dba1eb761a6937ab1d9fd02e607043d7d6434bb3f342b220a73',
  // '0xd78e55f09de9c1869064135807c1514b2b7f905b209cc570ecd52e04b03658ea',
  // '0x752c1557a4edaa74f9c6dd7c166ed91efce14ed906471641373f2a7b0284c1dd',
  // '0x0a6d99c8e50b86556ab7cb84f513e100421fbf30bfec67cdd18ce72025531993',
  // '0x6813bdf5e24e6b5dba7bf43da893b892b772ede62fd44dd2b64a3117337bbf1f',
  // '0x3de42f758236bfb794df199d9e8458379d3712d2ec688e2e5ff3c3df5f958fa1',
  // '0xc3dd13ceaf2f9de125cb236a3dbcf79c0c1f758ab6187ceda684e38455df61d3',
  // '0xd9335b69d0a9912557e1a9ede125108931bcab6aee6874f25ff38bd7f4e15b53',
  // '0x28f4d6a102a425f323ab09b3df79245cc107af12750359a3abff684eda8ccab4',
  // '0x96e311f6dc7880938a832d817d9c7bf5362db1c11b1aa5c7477029ec1a67fddb',
  // '0x6080466f782d79cf5e369d7ddb9dfad0a18d3305f9175f5dda9f018379dfa09b',
  // '0x02e00e22814427e254d8f3864e3c2fc7d4df8f5a880a02acd453e7ed266d34f3',
  // '0x7227d090de5230b94bb1276b3f7f88637c5f81ca78611dd688abaad8f444f994',
  // '0x35e984b55982c5ff052a556f4222d68c8418b30fef2a492a54fdc2932d37d922',
  // '0x7138e0ddbabc0a60acd45beab2de3b358b53de74f4232f39de107e6385948574',
  // '0x8e5d65220543375a787871bf75fd97ac5e92ab19e4e3966f8cd10e626a2a60a7',
  // '0x93368c81a1b5ae7bdda5f6d4438a468d021473bb87f2497fa9182919da4b0c94',
  // '0x4427153487539ae730ef8efea808c07bb204874254f1c2122c10061f45b9f3c6',
  // '0x435c11202ac6185b21b8db4fb611239f88b15a9fabd592881dcdc8e1d5699b1f',
  // '0xbd8906d0befd6ee002dde561784391592d87700d5e056feb55edeef379b0818e',
  // '0x8b2e8c033e6552fc84097959758d282fefef91b1fb14af4030000b9b9c0e4002',
  // '0xb0bce44cf9775397a5165866ba30bd3e08d803361e07dcd13836b0e6bac90115',
  // '0x4d498fe8a5c041a5b7db76193e7d8b892f0671e51ce96428ceb106ff3169a7c4',
  // '0x315d843fb171162091c0b48bcdf9e7b6cd501e5e7b95939008307e1528fe47b9',
  // '0xd7dffe2c62f550564eb39c36bcf0d6c5e42a81b465588d2130f0ea8069a7032e',
  // '0xe92b04c68d583298f3c4b7bcc2950e1eb87c1f07c3d1ebb882f58b1c859569d4',
  // '0x8d3f0ae15560c62602003b3ae3ac315225ce3efc5b8f1095f879874c57314bba',
  // '0x586842c544b265525a27f2f69b24e8ea8e04d449f5da3b8382f77b9abffa6e20',
  // '0x09a8b20b3de23b8f661e388e6541aa4e18b39edf7e2f0926e4b3763c82fee1e2',
  // '0xb79056285d7d62718d9b1f19087cf246f6fa4bd54b59fefb6e53674eb036819f',
  // '0x910bcc08eeca45f11593fe7b3aa808213a144ddcc952bd46480ebc827100def2',
  // '0xb236556aad9e923c4550fee8bba81c41c7536853354ebd67df2df39d0805dbc1',
  // '0x4f47385534d844365d9ec1642313713df7b50200d1934ff8500f021a4e50f0e1',
  // '0xc234e7aaa70f35381cce4ed61eb5fddebb86a1cb00ded43da6bf60e1da75ffe5',
  // '0x2cc4c39b7274f840719c07a65f6004a43a28545052fb79611568b94f8f286246',
  // '0x0dde40a5b8a6459a903a69c380e8dd1f5e2204834db7257d919d05cf5fb5b60e',
  // '0x0947712b8534d1c94dc99beb4471b5ff8a829146ac805a84899516ba7c2b921b',
  // '0x89eacd1f0cddb88b7eef5e29fb4ec02ec2c18091e032a0c678183f525e962e1b',
  // '0x3c95de2b959ef104f5237e7c7d827c84b7609e1c653d558d87c0d25919480c2b',
  // '0x84293ae420c269d3c6c1545a925de8110a2682d05580c02908eb599d93e88933',
  // '0x517aee0b4eb5683ea2ee6eea71ab1185a0d9fcbfdf32635fb7e3a00b43ed6105',
  // '0x7daee2949ac85d2f3dcba4c2d45a4841c4ff53c6f9280f01627e97120fdfe9da',
  // '0xee930d1872b327df3860ecd73230f947e6f580ac6d0dadc682a74dc8a4982dc9',
  // '0x302dd9fb18d7eb42ae6fb33885fd29d19f6994fffcdcb9aef2d7cd736ad62497',
  // '0xca6b572cc14692953bac2ac3a122bb825dee217d2fc06a36b45ca25989f70019',
  // '0x11dc7a8b213bb58657d84da0d5a3cdff873dde18be19b2b644cf0b3e115b66d1',
  // '0x8500d23729472f0c32264279081bee65e632c933cdc8f8cf55e763375f205fdb',
  // '0x01bd276fa345583afe6900dd0adca011f2403698773b885959b9a029f05b3c57',
  // '0x2d8a7f754f9061e593e0cc0c2837cccc385b5f8b78c0229c0bdb9896d88b4433',
  // '0x7abab9115123f9e5741aea38ea067c74dfa8b6092c8532dbcc8989f7a8d83a92',
  // '0x472b25279325695c81860fe0d64ac8b7042d1c84ea8e859c97e4acba9d586925',
  // '0x606f6a5d814a6fe0e19e092b15ada33448e8b4ae7de97193d39fb88b5e22a2bc',
  // '0x026620c2765771542f2bbe43dde1bbcd1961d7ca42aee878b7003bd58fbcdfa5',
  // '0xa7b5e4bc48f40cc2e6e7136ed5335b1e714b3108bfa3e38ba11337260bcc4a11',
  // '0x8450ab03bb68dcef8a02de079ea430859d8fe6b676d2766d2d0e9b51ef98deb3',
  // '0xf4cadad2be2ab909a67f64e6092caa80758b6c705c694993fe751c60a439e194',
  // '0x853fdf59b3e0d9d8fa9d05908df3d210d4e0ace89623d8c0d263df4e2c28d29e',
  // '0xcf879c7ed93fed3ffe32896a2f0f47b04b061a3553b1a29137885e2c2ce89137',
  // '0x90ee386b48c1f38ed4bd7892f79b4305a98f3f7fd6d3b6ff086737dcf27cc57d',
  // '0xa9bae751ffff6b3d2c6aff1076a3a8ec83f993f9c103c783c59bc6d994f903af',
  // '0xf2ba487dff86adcdb3de547fb379c76c529d3e281af8c4f0a410778bd82d1667',
  // '0xa2059864db657d873b0143d3d7d00835791eead71bd51b3a9f5552eec4222b4e',
  // '0x011518c2db496ca7aad11d852b07504703925fa5e068df9002480af49bb5a9cf',
  // '0xa94526a2fec1b0fad05cbbb809b7572f4489fad26eb186900f029b9131734587',
  // '0x0a1c8ea4623415a005e01c2b9b7d162be9b999b75a3ca7c25b919be63a5653e7',
  // '0x38d390dfca745c9d32032db845c4550e67fb271065b042778cc04c94d588d3ee',
  // '0xdb3575e62edb3032bbdaee45a7a65d228fc7f5cca2c5b7aa0955cc9df8a09ecb',
  // '0xc27d518fd5a69f2f7917988162e3b707b52e4c17143ff07737a158f19d272819',  // 99
];

export const VERIFY_DOMAIN_WITNESS: any = {
  "localhost": "0x0636c417755E3ae25C6c166D181c0607F4C572A3",
  "sepolia": "0x0636c417755E3ae25C6c166D181c0607F4C572A3",
  "base": "",
  "base_staging": "0x0636c417755E3ae25C6c166D181c0607F4C572A3",
};


export const ALLOWED_ADDRESSES_ENABLED: any = {
  "localhost": false,
  "sepolia": false,
  "base": false,
  "base_staging": false,
};

export const ALLOWED_ADDRESSES: any = {
  "localhost": [],
  "sepolia": [],
  "base": [],
  "base_staging": [],
};

// USDC
export const USDC: any = {
  "base": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "base_staging": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
};

// For Goerli and localhost
export const USDC_MINT_AMOUNT = usdc(1000000);
export const USDC_RECIPIENT = "0x1d2033DC6720e3eCC14aBB8C2349C7ED77E831ad";


export const FROM_EMAIL = {
  "namecheap": "support@namecheap.com",
};

// Deployment Parameters
export const SERVER_KEY_HASH = {
  "namecheap": [
    "0x0db7730bdd90c823601ed32395c8b2f3307fd4adc477ca22bf3ed406c1b3ae4a", // selector: s1
  ]
};