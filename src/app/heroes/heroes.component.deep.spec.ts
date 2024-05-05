import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Directive, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
        selector: '[routerLink]',
        host: { '(click)': 'onClick()' }
})
export class routerLinkDirectiveStub {
        @Input('routerLink') linkParams: any;
        navigatedTo: any = null;

        onClick() {
                this.navigatedTo = this.linkParams;
        }
}

describe('HeroesComponent (deep tests)', () => {
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
                        declarations: [HeroesComponent, HeroComponent, routerLinkDirectiveStub],
                        providers: [
                                { provide: HeroService, useValue: mockHeroService }
                        ],
                        // schemas: [NO_ERRORS_SCHEMA]
                })

                fixture = TestBed.createComponent(HeroesComponent);

        });

        it('should render each hero as a HeroComponent', () => {
                mockHeroService.getHeroes.and.returnValue(of(HEROES))

                //run ngOnInit
                fixture.detectChanges();

                const heroComponentDes = fixture.debugElement.queryAll(By.directive(HeroComponent));
                expect(heroComponentDes.length).toEqual(3);
                for (let i = 0; i < heroComponentDes.length; i++) {
                        expect(heroComponentDes[i].componentInstance.hero).toEqual(HEROES[i]);
                }

        })

        it(`should call heroService.deleteHero when the hero component's delete button is clicked`, () => {
                spyOn(fixture.componentInstance, 'delete');
                mockHeroService.getHeroes.and.returnValue(of(HEROES));

                //run ngOnInit
                fixture.detectChanges();
                const heroesComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
                heroesComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });
                // (<HeroComponent>heroesComponents[0].componentInstance).delete.emit(undefined); // alternate code
                // heroesComponents[0].triggerEventHandler('delete', null); // alternate code, raising events on child directive 

                expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        })

        it(`should add a new hero to the hero list when the add button is clicked`, () => {
                mockHeroService.getHeroes.and.returnValue(of(HEROES));
                //run ngOnInit
                fixture.detectChanges();
                const name = "Mr. Ice";
                mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 4 }));
                const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
                const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

                inputElement.value = name;
                addButton.triggerEventHandler('click', null);
                fixture.detectChanges();

                const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
                expect(heroText).toContain(name);
        })
});