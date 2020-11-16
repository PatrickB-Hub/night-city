const state = {
  pages: 10,
  sections: 10,
  scrollTop: 0,
  fov: 75,
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
  stripes: [
    { offset: 6.1, color: "#181818", height: 22 }
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
};

export default state;
