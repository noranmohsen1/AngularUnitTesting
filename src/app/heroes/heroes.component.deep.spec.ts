import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Observable, of } from "rxjs";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HerComponet (deep tests)', () => {
   let fixture: ComponentFixture<HeroesComponent>;
   let mockHeroService: { getHeroes: { and: { returnValue: (arg0: Observable<any>) => void; }; }; };
   let HEROES: { id: number; name: string; strength: number; }[];

   beforeEach(() =>{
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Women', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent,HeroComponent],
      providers: [
        {provide:HeroService,useValue:mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);


   });
     it('should render each hero as a HeroComponent', ()=>{

      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      //run ngoninit

      fixture.detectChanges();

     const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
     expect(heroComponentDEs.length).toEqual(3);
     for(let i=0; i < heroComponentDEs.length; i++ ){
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
     }
  })
});
