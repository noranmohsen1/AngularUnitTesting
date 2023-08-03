import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroService', () => {
  let mockMessageService: any;
  let httpTestingController : HttpTestingController;
  let service : HeroService;

  beforeEach(()=> {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    let service = TestBed.inject(HeroService);
  })

  describe('getHero', ()=> {
    it('should call get with the cirrect URL',() => {
      service.getHero(4).subscribe();
     const req = httpTestingController.expectOne('api/heroes/4')
     req.flush({id: 4, name: 'SuberDude', strength: 100})
    //  expect(req.request.method).toBe('Get');
     httpTestingController.verify();
    })
  })
})
