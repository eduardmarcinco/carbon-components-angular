import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component } from "@angular/core";
import { By } from "@angular/platform-browser";

import { ThemeDirective } from "./theme.directive";
import { LayerDirective } from "../layer";

@Component({
	template: `<div ibmTheme></div>`
})
class TestThemeComponent {}

describe("Theme", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TestThemeComponent,
				ThemeDirective,
				LayerDirective
			]
		});
	});

	it("should assign theme class to div", () => {
		TestBed.configureTestingModule({
			declarations: [TestThemeComponent, ThemeDirective]
		});

		let fixture: ComponentFixture<TestThemeComponent> = TestBed.createComponent(TestThemeComponent);
		let component: TestThemeComponent = fixture.componentInstance;
		fixture.detectChanges();

		expect(component).toBeTruthy();
		const directiveEl = fixture.debugElement.query(By.directive(ThemeDirective));
		expect(directiveEl).not.toBeNull();
		expect(directiveEl.nativeElement.classList.contains("cds--white")).toBeTruthy();
		expect(directiveEl.nativeElement.classList.contains("cds--layer-one")).toBeTruthy();
	});

	it("should reset nested layer level", () => {
		TestBed.overrideComponent(TestThemeComponent, {
			set: {
				template: `
					<div ibmLayer>
						<div ibmTheme>
							<div ibmLayer id="nested-layer"></div>
						</div>
					</div>
				`
			}
		});

		TestBed.compileComponents().then(() => {
			let fixture: ComponentFixture<TestThemeComponent> = TestBed.createComponent(TestThemeComponent);
			fixture.detectChanges();

			const directiveEl = fixture.debugElement.query(By.directive(ThemeDirective)).nativeElement;
			expect(directiveEl.querySelector("div").classList.contains("cds--layer-two")).toBeTruthy();
		});
	});
});