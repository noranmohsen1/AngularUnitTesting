import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HearoesComponent', () => {
  let component: HeroesComponent;
  let HEROES= [];
  let mockHeroService: any;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Women', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    component = new HeroesComponent(mockHeroService);
  })

  describe('delete', () => {

    it('should remove the indicated hero from the heroes list', () =>{
      mockHeroService.deleteHero.and.retrunValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    })
    it('should call deleteHero ', () => {
      mockHeroService.deleteHero.and.retrunValue(of(true))
      component.heroes = HEROES;

      component.delete(HEROES[2]);
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);

    })
  })
})
