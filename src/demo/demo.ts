export interface IHero {
  id: string;
  name: string;
  photo?: string;
}

export interface IHuman extends IHero {
  sex: string;
  age: number;
  health: number;
}

export interface ITransformer extends IHero {
  wings: number;
  wheels: number;
  clan: string;
}

let heros: Array<IHuman> = [];

let airMan: IHuman = {
  id: "1",
  name: "Air man",
  sex: "man",
  age: 40,
  health: 10
};
heros.push(airMan);
function getHero(name: string): IHero {
  let _hero: IHero = null;
  heros.forEach(hero => {
    if (hero.name == name) {
      _hero = hero;
      return;
    }
  });
  return _hero;
}

const hero = getHero("Air man");
console.log(hero);
