import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (Shallow tests)', () => {
        let fixture: ComponentFixture<HeroesComponent>;
        let mockHeroService;
        let HEROES;

        beforeEach(() => {
                HEROES = [
                        { id: 1, name: 'SpiderDude', strength: 8 },
                        { id: 1, name: 'Wonderful Women', strength: 24 },
                        { id: 1, name: 'SuperDude', strength: 55 }
                ]

                mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

                TestBed.configureTestingModule({
                        declarations: [HeroesComponent],
                        providers: [
                                { provide: HeroService, useValue: mockHeroService }
                        ],
                        schemas: [NO_ERRORS_SCHEMA]
                })

                fixture = TestBed.createComponent(HeroesComponent);

        });

        it('should set heroes correcly from the service', () => {
                mockHeroService.getHeroes.and.returnValue(of(HEROES))
                fixture.detectChanges();
                expect(fixture.componentInstance.heroes.length).toBe(3);
        })

        it('should create on li for each hero', () => {
                mockHeroService.getHeroes.and.returnValue(of(HEROES))
                fixture.detectChanges();
                expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
        })
})