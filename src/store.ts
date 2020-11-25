const state = {
  sections: 10,
  pages: 10,
  fov: 75,
  scrollTop: 0,
  textComponentOffset: 6,
  colors: {
    background: "#202020",
    headings: [
      "#fcf435",
      "#03d7f2"
    ],
    articleIndex: "#141414"
  },
  font: "./Play_Bold.json",
  hero: {
    image: "./cyberpunk_logo-blurred.png"
  },
  articles: [
    {
      offset: 1,
      factor: 1.75,
      header: "Skyline",
      image: "./city_night.png",
      aspect: 1.65,
      text: "Night City's corporate showcase. Sleek skyscrapers form a brutalist, fortress-like skyline, presenting the unrivaled power of megacorps in all its arrogance."
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Slums",
      image: "./city_fog.png",
      aspect: 1.55,
      text:
        "Heywood is a neighborhood of contrast—from modern skyscrapers and parks in the north, to dangerous, inhospitable slums in the south."
    },
    {
      offset: 3,
      factor: 2.25,
      header: "Vibrant",
      image: "./city_neon2.png",
      aspect: 1.5,
      text:
        "Westbrook is considered by many to be the best place to live and have fun in Night City. If you've got eddies, you come here to spend them. And if you don't? Well, take out a loan and pretend you're on top of the world."
    },
    {
      offset: 4,
      factor: 2.0,
      header: "Crime",
      image: "./city_day.png",
      aspect: 1.75,
      text:
        "By 2077, the city has been overrun with crime, with the crime rate doubled than that of the NUSA. The homeless population has been a problem since the 2000s, and is now risen 300%. Each district is dominated by at least one gang."
    },
    {
      offset: 5,
      factor: 1.75,
      header: "Trade",
      image: "./city_neon3.png",
      aspect: 1.55,
      text:
        "Kabuki is a maze of narrow alleyways located right next to Little China. At night, they turn into a bazaar for implants, organs, steroids, and much more. It's said anything a person could desire can be found in the Kabuki Market."
    },
    {
      offset: 7.25,
      factor: 1.55,
      header: "Thrilling",
      image: "./city_buildings.png",
      aspect: 1.7,
      text: "Night City is considered a thrilling and exciting location to visit, as well as an interesting and vibrant place to live for those of means, and a hellscape to the city's disenfranchised."
    },
    {
      offset: 8.25,
      factor: 1.5,
      header: "Busy",
      image: "./city_streets.png",
      aspect: 1.75,
      text: "The business sectors of Night City include manufacturing industries, international trade and commerce, information services, electronic technologies, security services, and so on."
    }
  ],
  crosses: [
    { factor: -0.25, offset: 0, speed: 7.5, color: "#141414", scale: [1, 1, 1], position: [6, 2.5, 0.1], },
    { factor: -1.25, offset: 6, speed: 10, color: "#fcf435", scale: [.8, .8, 1], position: [6, -1.5, 0.1] }
  ],
  lines: [
    { factor: -1.5, offset: 0, color: "#141414", scale: [0.17, 0.7, 1], position: [-4, 1.75, 0.1] },
    { factor: -1.5, offset: 6, color: "#fcf435", scale: [0.12, 0.35, 1], position: [4, 1.75, 0.1] },
    { factor: -1.2, offset: 6.25, color: "#fcf435", scale: [0.15, 0.5, 1], position: [-5, 2.75, 0.1] }
  ],
  stars: [
    { factor: -0.75, offset: 10, speed: 7.5, posFactor: -0.15, color: "#03D7F2", scale: [0.25, 0.25, 1], position: [-8, -8, 0.1] }
  ],
  stripes: [
    { offset: 6.1, color: "#181818", height: 22 }
  ],
  shards: [
    {
      args: [2.87483173052424, 2.120755196190408, 0.05],
      position: [3.116376203948097, -2.1742814140991196, 1.998859699752443],
      rotation: [0.2536197471688286, -0.6683567077395978, -0.8428053193736256]
    },
    {
      args: [1.799233278635274, 1.9642524560408021, 0.05],
      position: [-3.325473394997085, 3.5307542721423446, 1.530151273151705],
      rotation: [0.3951213133257899, -0.2888432911308304, 0.7178380971731012]
    },
    {
      args: [0.8780801433198553, 2.2065216543855974, 0.05],
      position: [1.2839348832937714, 2.888947614684322, 1.767835086028824],
      rotation: [-0.3341775957580109, 0.8031736269533125, -0.18771283594857274]
    },
    {
      args: [2.2175936863874006, 1.3820832190972703, 0.05],
      position: [4.552400557892, 0.9814639517113943, 2.136395383986279],
      rotation: [-0.3299625953354437, 0.6139693063561498, -0.3902201705507059]
    },
    {
      args: [1.7446126775638997, 1.8211835436253392, 0.05],
      position: [-2.826056860647832, -3.0308788716782042, 1.4685371584057485],
      rotation: [-0.4052581815125295, 0.002812728418492, 0.54202362440499]
    },
    {
      args: [1.139549518339333, 1.8007363020629232, 0.05],
      position: [-0.041834072623521124, -1.351281881742426, 1.40411451302583],
      rotation: [0.2848394396618561, -0.310029190116405, -0.107987000676972]
    },
    {
      args: [2.2021865186914007, 1.610358395964105, 0.05],
      position: [-4.1542927375782015, -0.349560252979882, 2.489538720961452],
      rotation: [0.4401104979160235, 0.8179123712769852, -0.2157249608220475]
    },
    {
      args: [0.1426105440458216, 2.416201863189162, 0.05],
      position: [0.646982562789564, 1.0909673302614196, -0.351518200349154],
      rotation: [-0.0692356415822184, 1.918047448701773, 0.5268942683942657]
    }
  ]
};

export default state;
