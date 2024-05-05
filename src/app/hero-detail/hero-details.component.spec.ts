import { TestBed } from "@angular/core/testing"
import { HeroDetailComponent } from "./hero-detail.component"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";

describe('HeroDetailsComponent', () => {
        let fixture, mockActivatedRoute, mockHeroService, mockLocation;
        beforeEach(() => {
                mockActivatedRoute = {
                        snapshot: { paramMap: { get: () => { return '3' } } }
                }
                mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
                mockLocation = jasmine.createSpyObj(['back']);

                TestBed.configureTestingModule({
                        declarations: [HeroDetailComponent],
                        providers: [
                                { provider: ActivatedRoute, useValue: mockActivatedRoute },
                                { provider: HeroService, useValue: mockHeroService },
                                { provider: Location, useValue: mockLocation }
                        ]
                });
                fixture = TestBed.createComponent(HeroDetailComponent);

        })
})