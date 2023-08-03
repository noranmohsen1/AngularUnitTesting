import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HerComponet (shallow tests)', () => {
   let fixture: ComponentFixture<HeroesComponent>;
   let mockHeroService: { getHeroes: { and: { returnValue: (arg0: Observable<any>) => void; }; }; };
   let HEROES: { id: number; name: string; strength: number; }[];

   @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
   class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }
   beforeEach(() =>{
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Women', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent,FakeHeroComponent],
      providers: [
        {provide:HeroService,useValue:mockHeroService}
      ],
    })
    fixture = TestBed.createComponent(HeroesComponent);
   })
    it('should set heroes correctly from the sevice', () =>{
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();

      expect(fixture.componentInstance.heroes.length).toBe(3);
    });
    it('should create one li for each hero', ()=>{
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
   })
